import { Heart, Search, ShoppingCart } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { LikeFlower, UnlikeFlower } from "../hooks/LikeFn";
import { useDispatch, useSelector } from "react-redux";
import { addToCart, removeFromCart } from "../redux/cartSlice";

const api = import.meta.env.VITE_PUBLIC_GREENSHOP_API
const accessToken = JSON.parse(localStorage.getItem("user"))?.user?._id || '67e54a392802b2864782ff30';

export default function ProductCard({ data }) {
    if (!data) return <div>Product Not Valid</div>;
    let { title: name, _id: id, main_image, price, discount_price, category: route_path, discount: isSale } = data;
    if (name === "Peace Lil") {
        route_path = 'house-plants'
    }
    const Wishlist = JSON.parse(localStorage.getItem('wishlist')) || [];
    const wish = Wishlist.some(item => item.flower_id === id);
    const navigate = useNavigate();
    const [isLiked, setIsLiked] = useState(wish);
    const cartItems = useSelector((state) => state.cart.cart);
    const isInCart = cartItems.some(item => item.id === id);
    const dispatch = useDispatch();



    const handleLike = () => {
        const user = JSON.parse(localStorage.getItem("user"))?.user || null;
        if (!user) {
            toast.warning('Please Login or register first')
            return
        }
        if (isLiked) {
            UnlikeFlower(route_path, id, name, setIsLiked);
        } else {
            LikeFlower(route_path, id, name, setIsLiked);
        }
    };

    const handleAddToCart = () => {
        dispatch(addToCart({ id, name, main_image, price }));
        toast.success("Added to Cart 🛒", { description: `${name} has been successfully added to your cart.` });
    };

    const handleCartClick = () => {
        if (isInCart) {
            dispatch(removeFromCart(id));
            toast.error("Removed from Cart 🗑️", { description: `${name} has been removed from your cart.` });
        } else {
            handleAddToCart();
        }
    };

    const calculateDiscountPercent = (originalPrice, discountedPrice) => {
        const discounted = Number(discountedPrice);
        if (!originalPrice || !discounted || originalPrice <= discounted) return 0;
        return Math.round(((originalPrice - discounted) / originalPrice) * 100);
    };
    const discountPercent = calculateDiscountPercent(price, discount_price);

    return (
        <div className="max-w-[300px] w-full hover:shadow-md shadow-black transition-all group rounded-lg p-3">
            <div className="card_img relative rounded overflow-hidden ">
                <div onClick={() => navigate(`/aboutProduct/${route_path}/${id}`)} className="bg-[#FBFBFB] cursor-pointer w-full max-sm:h-[250px] max-md:h-[200px] h-[275px] flex justify-center items-center">
                    <img width={250} height={250} priority src={main_image} alt={name} className="w-full h-auto object-contain" />
                </div>
                <div className="flex max-sm:hidden justify-center items-center absolute w-full bottom-0 gap-0.5 opacity-0 group-hover:opacity-100 group-hover:gap-3 group-hover:bottom-2">
                    <button onClick={handleCartClick} className={`p-2 hover:bg-gray-200 transi bg-white rounded cursor-pointer ${isInCart ? 'text-[#46A358]' : ''}`}>
                        <ShoppingCart size={19} fill={isInCart ? "#46A358" : "none"} />
                    </button>
                    <button onClick={handleLike} className={`p-2 hover:bg-gray-200 bg-white rounded cursor-pointer ${isLiked ? 'text-red-500' : ''}`}>
                        <Heart size={19} fill={isLiked ? "red" : "none"} />
                    </button>
                    <button onClick={() => navigate(`/aboutProduct/${route_path}/${id}`)} className="p-2 hover:bg-gray-200 hover:text-[#46A358] transi bg-white rounded cursor-pointer">
                        <Search size={19} />
                    </button>
                </div>
                <button onClick={handleLike} className={` sm:hidden absolute top-3 right-3 transi rounded cursor-pointer ${isLiked ? 'text-red-500' : ''}`}>
                    <Heart size={19} fill={isLiked ? "red" : "none"} />
                </button>
                {isLiked && <div className={`absolute rounded-bl hidden group-hover:opacity-100 group-hover:-top-7 group-hover:-right-10 ${isInCart ? 'opacity-0' : 'opacity-100'} top-0 right-0 bg-[#46A358] text-white text-sm px-2 py-1 font-bold`}>In your Wishlist</div>}
                {isInCart && <div className={`absolute opacity-100 hidden rounded-bl transi group-hover:opacity-0 group-hover:-top-7 group-hover:-right-10 top-0 right-0 bg-[#46A358] text-white text-sm px-2 py-1 font-bold`}>In your Cart</div>}
            </div>
            <div className="flex justify-between items-center">
                <div>
                    <h4 onClick={() => navigate(`/aboutProduct/${route_path}/${id}`)} className="text-xl font-bold cursor-pointer mt-4">{name}</h4>
                </div>
                <div className="my-2 flex gap-3 bg-transparent rounded-xl p-1 border shadow-[#2c6d2cc0] shadow-2xl">
                    <p className="">Price:</p>
                    <span className="flex gap-1">
                        <span className="font-semibold text-gray-500 line-through"> ${Number(discount_price).toFixed(2)}</span>
                        <span className="font-semibold bg-green-500 text-white rounded-lg px-2">${price.toFixed(2)}</span>
                    </span>
                </div>
            </div>
            <div className="mt-3 rounded-md py-2 flex flex-col gap-2">
                <p className="text-[#186d0b9a]">Discount: {discountPercent}%</p>
                <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Cum, saepe.</p>
            </div>
        </div>
    );
}