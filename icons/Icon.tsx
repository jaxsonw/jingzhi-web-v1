import Image from "next/image";

export interface StaticImageData {
  src: string;
  height: number;
  width: number;
  blurDataURL?: string;
  blurWidth?: number;
  blurHeight?: number;
}
export interface StaticRequire {
  default: StaticImageData;
}
export type StaticImport = StaticRequire | StaticImageData;

const Icon = ({
  className,
  src,
}: {
  className?: string;
  src: string | StaticImport;
}) => <Image src={src} className={className} />;

export default Icon;
