import { useEffect, useState } from "react";
import Cropper from "react-easy-crop";
import imageCompression from "browser-image-compression";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";

import { toast } from "sonner";
import { useUploadAvatar } from "@/hooks/useUploadAvatar";

export default function AvatarUpload({ user, onSuccess }) {
  const [imageSrc, setImageSrc] = useState(null);
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);

  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);

  const { mutateAsync: uploadAvatar } = useUploadAvatar();

  useEffect(() => {
    return () => {
      if (imageSrc) {
        URL.revokeObjectURL(imageSrc);
      }
    };
  }, [imageSrc]);

  const onFileChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (!file.type.startsWith("image/")) {
      toast.error("Only image files are allowed");
      return;
    }
    if (file.size > 5 * 1024 * 1024) {
      toast.error("Maximum file size is 5MB");
      return;
    }
    if (imageSrc) {
      URL.revokeObjectURL(imageSrc);
    }
    const url = URL.createObjectURL(file);
    setImageSrc(url);
  };

  const toBlob = (canvas) =>
    new Promise((resolve) => {
      canvas.toBlob((blob) => resolve(blob), "image/jpeg", 0.9);
    });

  const getCroppedImage = async () => {
    if (!croppedAreaPixels || !imageSrc) return null;
    const image = new Image();
    image.src = imageSrc;
    await new Promise((resolve, reject) => {
      image.onload = resolve;
      image.onerror = reject;
    });
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");
    const size = 300;
    canvas.width = size;
    canvas.height = size;
    ctx.drawImage(
      image,
      croppedAreaPixels.x,
      croppedAreaPixels.y,
      croppedAreaPixels.width,
      croppedAreaPixels.height,
      0,
      0,
      size,
      size,
    );
    const blob = await toBlob(canvas);
    if (!blob) return null;
    return new File([blob], `avatar-${Date.now()}.jpg`, {
      type: "image/jpeg",
    });
  };

  const compressImage = async (file) => {
    return imageCompression(file, {
      maxSizeMB: 0.5,
      maxWidthOrHeight: 512,
      useWebWorker: true,
    });
  };

  const handleUpload = async () => {
    try {
      setUploading(true);
      setProgress(0);
      const croppedFile = await getCroppedImage();
      if (!croppedFile) {
        toast.error("Failed to process image");
        return;
      }
      const compressedFile = await compressImage(croppedFile);
      const formData = new FormData();
      formData.append("avatar", compressedFile);
      await uploadAvatar({
        formData,
        onProgress: (percent) => {
          setProgress(percent);
        },
      });
      toast.success("Avatar updated successfully");
      setImageSrc(null);
      setZoom(1);
      setCrop({ x: 0, y: 0 });
      onSuccess?.();
    } catch (error) {
      console.error(error);
      toast.error(error?.response?.data?.message || "Upload failed");
    } finally {
      setUploading(false);
      setProgress(0);
    }
  };
  const avatarSrc =
    imageSrc ||
    (user?.avatar
      ? `${import.meta.env.VITE_SERVER_URL}${user.avatar}`
      : undefined);
  console.log(user?.avatar);
  console.log(avatarSrc);
  return (
    <div className="space-y-4">
      <Avatar className="w-24 h-24">
        <AvatarImage src={avatarSrc} />
        <AvatarFallback>
          {user?.fullName?.charAt(0)?.toUpperCase() || "U"}
        </AvatarFallback>
      </Avatar>

      <Input
        type="file"
        accept="image/*"
        onChange={onFileChange}
        disabled={uploading}
      />

      {imageSrc && (
        <>
          <div className="relative h-64 w-full overflow-hidden rounded-lg bg-black">
            <Cropper
              image={imageSrc}
              crop={crop}
              zoom={zoom}
              aspect={1}
              cropShape="round"
              showGrid={false}
              onCropChange={setCrop}
              onZoomChange={setZoom}
              onCropComplete={(_, croppedPixels) =>
                setCroppedAreaPixels(croppedPixels)
              }
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm">Zoom</label>

            <input
              type="range"
              min={1}
              max={3}
              step={0.1}
              value={zoom}
              onChange={(e) => setZoom(Number(e.target.value))}
              className="w-full"
            />
          </div>
        </>
      )}

      {uploading && (
        <div className="space-y-2">
          <Progress value={progress} />
          <p className="text-sm text-muted-foreground text-center">
            {progress}%
          </p>
        </div>
      )}

      <Button
        className="w-full"
        disabled={!imageSrc || uploading}
        onClick={handleUpload}
      >
        {uploading ? "Uploading..." : "Save Avatar"}
      </Button>
    </div>
  );
}
