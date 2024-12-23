import { Textarea } from "@/components/ui/textarea";

const page = () => {
  return (
    <div className="pt-16 min-h-screen w-11/12 md:container mx-auto">
      <div>
        <h2 className=" font-bold uppercase text-xl py-3 text-center">
          <span className="bg-gradient-to-tr from-purple-900 to-primary bg-clip-text text-transparent">
            Add Post
          </span>
        </h2>
        <Textarea
          placeholder="Type your message here."
          className="min-h-[calc(100vh-500px)] resize-y"
        />
      </div>
    </div>
  );
};

export default page;
