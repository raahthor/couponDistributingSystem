export default function Hero() {
  return (
    <section className="relative py-10 overflow-hidden">
      <div className="max-w-8xl mx-auto px-4">
        <div className="flex flex-col items-center">
          <div className=" text-center mb-12">
            <h1 className="text-5xl font-bold mb-6 leading-tight">
              Claim Exclusive Coupons Instantly!
            </h1>
            <p className="text-xl text-gray-300">
              Save big with our curated collection of premium coupons. Get
              instant access to exclusive deals from your favorite brands.
            </p>
          </div>
          {/* <div className="lg:w-1/2">
            <img
              src="https://creatie.ai/ai/api/search-image?query=A 3D vector-style image with a clean, solid background color showing a modern smartphone displaying digital coupons and discount tags floating around it, with a minimalist design style and vibrant colors&width=600&height=500&orientation=portrait&removebg=true&flag=d3dae26c-5868-4bfd-99ea-672be163c926"
              alt="Hero Image"
              className="w-full object-contain"
            />
          </div> */}
        </div>
      </div>
    </section>
  );
}
