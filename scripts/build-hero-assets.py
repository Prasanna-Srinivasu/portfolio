import os
import subprocess
import numpy as np
from PIL import Image

def run_cmd(cmd):
    print("Running:", " ".join(cmd) if isinstance(cmd, list) else cmd)
    env = os.environ.copy()
    subprocess.check_call(cmd, env=env, shell=isinstance(cmd, str))

def main():
    source_video = r"D:\portfolio\prasanna intro.mp4"
    public_dir = os.path.abspath("public")
    hero_dir = os.path.join(public_dir, "hero")
    os.makedirs(hero_dir, exist_ok=True)
    temp_dir = os.path.abspath("scripts/temp")
    os.makedirs(temp_dir, exist_ok=True)

    print(f"Processing {source_video}...")

    # 1. Video crop & studio contrast
    # Presenter crop 440x550 centered around person (X: 404, Y: 10), scaled to 768x960
    # Natural, crisp studio contrast preserving shirt folds, collar, and button textures
    crop_filter = "crop=440:550:404:10,scale=768:960,eq=contrast=1.06:brightness=-0.01:saturation=1.05"
    
    # Total duration is 10.0s. Fade duration = 0.5s. Result duration = 9.5s.
    # Split:
    # A = 0.5s to 10.0s (duration 9.5s)
    # B = 0.0s to 0.5s (duration 0.5s)
    # xfade transition=fade, duration=0.5, offset=9.0
    processed_video = os.path.join(temp_dir, "loop_video.mp4")
    video_filter = (
        f"[0:v]{crop_filter},split=2[v_all1][v_all2];"
        f"[v_all1]trim=start=0.5:end=10.0,setpts=PTS-STARTPTS[vA];"
        f"[v_all2]trim=start=0.0:end=0.5,setpts=PTS-STARTPTS[vB];"
        f"[vA][vB]xfade=transition=fade:duration=0.5:offset=9.0[v_out]"
    )
    
    cmd_video = [
        "ffmpeg", "-y", "-i", source_video,
        "-filter_complex", video_filter,
        "-map", "[v_out]",
        "-c:v", "libx264", "-crf", "18", "-preset", "fast",
        "-an", processed_video
    ]
    run_cmd(cmd_video)

    # 2. Audio extraction and seamless cross-fade in numpy
    # Extract audio as 16-bit 48kHz WAV
    raw_audio = os.path.join(temp_dir, "raw_audio.wav")
    run_cmd(["ffmpeg", "-y", "-i", source_video, "-vn", "-acodec", "pcm_s16le", "-ar", "48000", "-ac", "2", raw_audio])

    import wave
    with wave.open(raw_audio, 'rb') as wf:
        n_channels = wf.getnchannels()
        sampwidth = wf.getsampwidth()
        framerate = wf.getframerate()
        n_frames = wf.getnframes()
        raw_bytes = wf.readframes(n_frames)

    audio_data = np.frombuffer(raw_bytes, dtype=np.int16).reshape(-1, n_channels).astype(np.float32)

    # Audio timing:
    # Part A: samples from 0.5s to 10.0s (9.5s)
    # Part B: samples from 0.0s to 0.5s (0.5s)
    start_A = int(0.5 * framerate)
    end_A = int(10.0 * framerate)
    if end_A > len(audio_data):
        end_A = len(audio_data)
    part_A = audio_data[start_A:end_A].copy()

    fade_samples = int(0.5 * framerate)
    part_B = audio_data[0:fade_samples].copy()

    # Apply cross-fade to the last fade_samples of part_A with part_B
    weights = np.linspace(0.0, 1.0, fade_samples)[:, None]
    part_A[-fade_samples:] = part_A[-fade_samples:] * (1.0 - weights) + part_B[:fade_samples] * weights

    # Clamp and convert back to int16
    loop_audio_data = np.clip(part_A, -32768, 32767).astype(np.int16)

    loop_audio = os.path.join(temp_dir, "loop_audio.wav")
    with wave.open(loop_audio, 'wb') as wf:
        wf.setnchannels(n_channels)
        wf.setsampwidth(sampwidth)
        wf.setframerate(framerate)
        wf.writeframes(loop_audio_data.tobytes())

    # 3. Export hero.mp4 and hero.webm
    out_mp4 = os.path.join(hero_dir, "hero.mp4")
    cmd_mp4 = [
        "ffmpeg", "-y",
        "-i", processed_video,
        "-i", loop_audio,
        "-c:v", "libx264", "-pix_fmt", "yuv420p", "-crf", "24", "-preset", "slow",
        "-c:a", "aac", "-b:a", "96k",
        "-movflags", "+faststart",
        out_mp4
    ]
    run_cmd(cmd_mp4)

    out_webm = os.path.join(hero_dir, "hero.webm")
    cmd_webm = [
        "ffmpeg", "-y",
        "-i", processed_video,
        "-i", loop_audio,
        "-c:v", "libvpx-vp9", "-crf", "36", "-b:v", "0",
        "-c:a", "libopus", "-b:a", "80k",
        out_webm
    ]
    run_cmd(cmd_webm)

    # 4. Portrait bust from provided photo or clearest frame
    photo_src = r"D:\portfolio\1778397569877.jpg"
    bust_webp = os.path.join(public_dir, "portrait-bust.webp")
    if os.path.exists(photo_src):
        img_photo = Image.open(photo_src)
        crop_box = (75, 100, 515, 650)
        bust_crop = img_photo.crop(crop_box).resize((480, 600), Image.Resampling.LANCZOS)
        bust_crop.save(bust_webp, "WEBP", quality=95)
        print("Saved portrait bust from professional photo:", bust_webp)
    else:
        bust_frame = os.path.join(temp_dir, "bust_frame.png")
        run_cmd(["ffmpeg", "-y", "-ss", "00:00:02", "-i", source_video, "-vframes", "1", bust_frame])
        img = Image.open(bust_frame)
        crop_h = 360
        crop_w = int(crop_h * 480 / 600)
        x1 = int(611 - crop_w / 2)
        y1 = 16
        bust_crop = img.crop((x1, y1, x1 + crop_w, y1 + crop_h)).resize((480, 600), Image.Resampling.LANCZOS)
        bust_crop.save(bust_webp, "WEBP", quality=92)
        print("Saved portrait bust from video frame:", bust_webp)

    # 5. OG Image: 1200x630 saved as public/og.jpg on pure white studio background
    og_img = Image.new("RGB", (1200, 630), color=(255, 255, 255))
    og_bust = bust_crop.resize((360, 450), Image.Resampling.LANCZOS)
    og_img.paste(og_bust, (750, 90))
    og_path = os.path.join(public_dir, "og.jpg")
    og_img.save(og_path, "JPEG", quality=92)
    print("Saved OG image:", og_path)

    # 6. Copy resume PDF to public/
    import shutil
    resume_src = r"D:\portfolio\Manthena_Lakshmi_Prasannaa_Resume.pdf"
    if os.path.exists(resume_src):
        shutil.copyfile(resume_src, os.path.join(public_dir, "Manthena_Lakshmi_Prasannaa_Resume.pdf"))
        shutil.copyfile(resume_src, os.path.join(public_dir, "resume.pdf"))
        print("Copied resume to public/")

    print("Hero asset generation complete!")

if __name__ == "__main__":
    main()
