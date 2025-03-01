import { Button } from "@/components/ui/button";
import { FileIcon } from "lucide-react";
import { X } from "lucide-react";
import Image from "next/image";
import React from "react";

const getLogo = (mimetype: string, name?: string): string => {
  // console.log(mimetype, name);
  if (mimetype.includes("pdf")) {
    return "/assets/attachment-icons/pdf.svg";
  } else if (mimetype.includes("wordprocessingml") || mimetype.includes("msword")) {
    return "/assets/attachment-icons/word.svg";
  } else if (mimetype.includes("presentationml") || mimetype.includes("powerpoint")) {
    return "/assets/attachment-icons/powerpoint.svg";
  } else if (mimetype.includes("spreadsheetml") || mimetype.includes("excel")) {
    return "/assets/attachment-icons/excel.svg";
  } else if (mimetype.includes("zip")) {
    return "/assets/attachment-icons/zip.svg";
  } else if (mimetype.includes("rtf")) {
    return "/assets/attachment-icons/rtf.svg";
  } else if (mimetype.includes("audio")) {
    return "/assets/attachment-icons/audio.svg";
  } else if (mimetype.includes("video")) {
    return "/assets/attachment-icons/video.svg";
  } else if (mimetype.includes("figma")) {
    return "/assets/attachment-icons/figma.svg";
  }

  return "";
};

type Props = {
  removeAttachment: (index: number) => void;
  index: number;
  file: File;
};

export const UploadedFileIcon = ({ removeAttachment, index, file }: Props) => {
  console.log(file);
  return (
    <div className="relative h-24 w-full">
      {file.type.startsWith("image/") ? (
        <>
          <Image src={URL.createObjectURL(file)} alt={file.name} fill className="object-cover" />
          <Button
            variant="ghost"
            size="icon"
            className="absolute right-1 top-1 h-6 w-6 bg-black/20 opacity-0 backdrop-blur-sm transition-opacity hover:bg-black/30 group-hover:opacity-100"
            onClick={() => removeAttachment(index)}
          >
            <X className="h-3 w-3 text-white" />
          </Button>
        </>
      ) : (
        <div className="bg-muted/20 flex h-full w-full items-center justify-center">
          <Image src={getLogo(file.type, file.name)} alt={file.name} width={48} height={48} />
          <Button
            variant="ghost"
            size="icon"
            className="absolute right-1 top-1 h-6 w-6 opacity-0 transition-opacity group-hover:opacity-100"
            onClick={() => removeAttachment(index)}
          >
            <X className="h-3 w-3" />
          </Button>
        </div>
      )}
    </div>
  );
};
