$ErrorActionPreference = "Stop"

$projectDir = "C:\Users\Lenovo\.gemini\antigravity\scratch\portfolio"
$stagingDir = "$env:TEMP\portfolio_staging"

Write-Host "Creating staging directory at $stagingDir..."
if (Test-Path $stagingDir) {
    Remove-Item -Recurse -Force $stagingDir
}
New-Item -ItemType Directory -Path $stagingDir | Out-Null

Write-Host "Copying src, public, scripts..."
Copy-Item -Recurse -Path "$projectDir\src" -Destination "$stagingDir\src"
Copy-Item -Recurse -Path "$projectDir\public" -Destination "$stagingDir\public"
Copy-Item -Recurse -Path "$projectDir\scripts" -Destination "$stagingDir\scripts"

$files = @(
    "package.json",
    "package-lock.json",
    "tsconfig.json",
    "next.config.ts",
    "next-env.d.ts",
    ".gitignore",
    "README.md"
)

foreach ($f in $files) {
    $srcPath = "$projectDir\$f"
    if (Test-Path $srcPath) {
        Copy-Item -Path $srcPath -Destination "$stagingDir\$f"
    }
}

$zipD = "D:\portfolio\portfolio-lakshmi-prasanna.zip"
$zipScratch = "C:\Users\Lenovo\.gemini\antigravity\scratch\portfolio-lakshmi-prasanna.zip"
$zipPublic = "$projectDir\public\portfolio.zip"

Write-Host "Compressing archive to $zipD..."
if (Test-Path $zipD) { Remove-Item -Force $zipD }
Compress-Archive -Path "$stagingDir\*" -DestinationPath $zipD -CompressionLevel Optimal

Write-Host "Copying archive to scratch and public..."
Copy-Item $zipD $zipScratch -Force
Copy-Item $zipD $zipPublic -Force

Write-Host "Cleaning up staging directory..."
Remove-Item -Recurse -Force $stagingDir

Write-Host "Successfully generated ZIP archives:"
Get-Item $zipD, $zipScratch, $zipPublic | Select-Object FullName, @{Name="Size (MB)"; Expression={[math]::round($_.Length / 1MB, 2)}}, LastWriteTime | Format-Table -AutoSize
