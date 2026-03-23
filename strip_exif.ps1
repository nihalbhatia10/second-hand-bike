Add-Type -AssemblyName System.Drawing
$imageDir = "c:\Users\nihal\OneDrive\Desktop\second hand bike\images"
$files = Get-ChildItem -Path $imageDir -Filter "*.jpg"

foreach ($file in $files) {
    if ($file.Name -match "^IMG_") {
        Write-Host "Stripping EXIF from $($file.Name)..."
        $oldImage = [System.Drawing.Image]::FromFile($file.FullName)
        
        # Create a new blank bitmap matching original dimensions
        $newBitmap = New-Object System.Drawing.Bitmap($oldImage.Width, $oldImage.Height)
        
        # Draw old image to new bitmap (no EXIF tags are copied)
        $graphics = [System.Drawing.Graphics]::FromImage($newBitmap)
        $graphics.DrawImage($oldImage, 0, 0, $oldImage.Width, $oldImage.Height)
        
        $tempPath = "$($file.FullName).tmp"
        $newBitmap.Save($tempPath, [System.Drawing.Imaging.ImageFormat]::Jpeg)
        
        $graphics.Dispose()
        $newBitmap.Dispose()
        $oldImage.Dispose()
        
        Move-Item -Path $tempPath -Destination $file.FullName -Force
    }
}
Write-Host "Done."
