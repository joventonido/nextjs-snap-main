import { buttonVariants } from "@/components/ui/button";
import Link from "next/link";
import Image from "next/image";
import sampleImage from "../../public/images/sample_image.jpg";
import SignInForm from "@/components/form/SignInForm";

export default function Home() {
  return (
    <>
      <div>
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            zIndex: -1,
          }}
        >
          <Image
            src={sampleImage}
            alt="Background Image"
            layout="fill"
            objectFit="cover"
          />
        </div>

        <div className="float-right">
          {/* <h1 className="text-white text-4xl">Home</h1> */}
          {/* <Link className={buttonVariants()} href="/admin">
            Open Admin
          </Link> */}
          <div className="w-full">
            <SignInForm />
          </div>
        </div>
      </div>

      {/* <h1 className="text-4xl">Home</h1>
      <Link className={buttonVariants()} href="/admin">
        Open Admin
      </Link> */}
    </>
  );
}
