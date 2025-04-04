import { Image } from "antd";
import { Link } from "react-router-dom";

export default function Footer() {
    return (
        <footer className="px-4 md:px-6 lg:px-16 xl:32 2xl:px-30 bg-gray-100 text-sm mt-24">
        {/* top */}
        <div className="flex flex-col py-4 md:flex-row justify-between gap-24">
          {/* left */}
          <div className="w-full md:w-1/2 lg:w-1/4 flex flex-col gap-8">
            {/* <Link href="/">
              <div className="text-2xl tracking-wide">Green Shop</div>
            </Link> */}
            <p>Toshkent shahri, Yunsobod tumani, Assalom Havo, 52-dom, 123-uy</p>
            <span className="font-semibold">xurshidbek@gmail.com</span>
            <span className="font-semibold">+998 94 101 26 80</span>
            <div className="flex gap-6">
              <Image src="/facebook.png" alt="" width={16} height={16} />
              <Image src="/instagram.png" alt="" width={16} height={16} />
              <Image src="/youtube.png" alt="" width={16} height={16} />
            </div>
          </div>
          {/* center */}
          <div className="hidden lg:flex justify-between w-1/2">
            <div className="flex flex-col gap-6">
              <h1 className="font-medium text-lg">COMPANY</h1>
              <div className="flex flex-col gap-6">
                <Link href="">About Us</Link>
                <Link href="">Careers</Link>
                <Link href="">Blog</Link>
                <Link href="">Contact Us</Link>
              </div>
            </div>
  
            <div className="flex flex-col gap-6">
              <h1 className="font-medium text-lg">SHOP</h1>
              <div className="flex flex-col gap-6">
                <Link href="">New Arrivals</Link>
                <Link href="">Accessories</Link>
                <Link href="">Women</Link>
                <Link href="">All Products</Link>
              </div>
            </div>
  
            <div className="flex flex-col gap-6">
              <h1 className="font-medium text-lg">HELP</h1>
              <div className="flex flex-col gap-6">
                <Link href="">Custumer Service</Link>
                <Link href="">My Account</Link>
                <Link href="">Find a Store</Link>
                <Link href="">Gift Card</Link>
              </div>
            </div>
          </div>
          {/* right */}
          <div className="w-full md:w-1/2 lg:w-1/4 flex flex-col gap-8">
            <h1 className="font-medium text-lg">SUBSCRIBE</h1>
            <p className="">
              Lorem ipsum dolor, sit amet consectetur adipisicing elit. Earum,
              nobis.
            </p>
            <div className="flex">
              <input
                type="text"
                placeholder="Email adress"
                className="p-4 w-3/4"
              />
              <button className="w-1/4 bg-green-500 text-white">JOIN</button>
            </div>
            <span className="font-semibold">Payments</span>
            <div className="flex justify-between">
              <Image src="/discover.png" alt="" width={40} height={20} />
              <Image src="/skrill.png" alt="" width={40} height={20} />
              <Image src="/mastercard.png" alt="" width={40} height={20} />
              <Image src="/visa.png" alt="" width={40} height={20} />
              <Image src="/paypal.png" alt="" width={40} height={20} />
            </div>
          </div>
        </div>
        {/* bottom */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-8 mt-16">
          <div className="">@ 2025 Green Shop</div>
          <div className="flex flex-col gap-8 md:flex-row">
            <div className="">
              <span className="text-gray-500 mr-4">Language</span>
              <span className="font-medium">Uzbekiston | Uzbek</span>
            </div>
            <div className="">
              <span className="text-gray-500 mr-4">Currency</span>
              <span className="font-medium">&SUM | $USD</span>
            </div>
          </div>
        </div>
      </footer>
    )
}

