import axios from "axios";
import { toast } from "sonner";
const api = import.meta.env.VITE_PUBLIC_GREENSHOP_API
const accessToken = JSON.parse(localStorage.getItem("user"))?.user?._id || '64bebc1e2c6d3f056a8c85b7';

export const LikeFlower = async (route_path, flower_id, name, setIsLiked) => {
    try {
        const response = await axios.post(`${api}/user/create-wishlist?access_token=${accessToken}`, {
            route_path,
            flower_id
        });

        if (response.data.message === 'success') {
            toast.success(`${name} ❤️`, { description: ` added to your wishlist 😍 !` });
            const wishlist = JSON.parse(localStorage.getItem('wishlist')) || [];
            const updatedWishlist = [...wishlist, { route_path, flower_id }];
            localStorage.setItem('wishlist', JSON.stringify(updatedWishlist));
            setIsLiked(true);
        } else {
            toast.error(`Failed to add ${name} to wishlist. ❌`);
        }
    } catch (error) {
        console.error("Wishlist error:", error);
        toast.error("Something went wrong while adding to wishlist.");
    }
};



export const UnlikeFlower = async (route_path, flower_id, name, setIsLiked) => {
    try {
        const response = await axios.delete(`${api}/user/delete-wishlist?access_token=${accessToken}`, {
            data: { _id: flower_id }
        });
        if (response.data.message === 'success') {
            toast.error(`${name} 💔`, { description: ` removed from your wishlist 😩 ! ` });
            const wishlist = JSON.parse(localStorage.getItem('wishlist')) || [];
            const updatedWishlist = wishlist.filter(item => item.route_path !== route_path || item.flower_id !== flower_id);
            localStorage.setItem('wishlist', JSON.stringify(updatedWishlist));
            setIsLiked(false);
        } else {
            toast.error(`Failed to remove ${name} from wishlist. ❌`);
        }
    } catch (error) {
        console.error("Wishlist error:", error);
        toast.error("Something went wrong while removing from wishlist.");
    }
}


export const fetchFlower = async ({ queryKey }) => {
    const [_key, route_path, id] = queryKey;
    const { data } = await axios.get(`${api}flower/category/${route_path}/${id}?access_token=${accessToken}`);
    return data.data;
}

export const fetchUser = async ({queryKey})=>{
    const [_key, id] = queryKey;
    const {data} = await axios.get(`${api}/user/by_id/${id}?access_token=${accessToken}`);
    return data.data;
}

export const fetchUserImg = async ({ queryKey }) => {
    const [_key, id] = queryKey;
    if (!id) return null;
    const { data } = await axios.get(`${api}user/by_id/${id}?access_token=${accessToken}`);
    return data.data;
}

export const fetchFlowers = async ({ queryKey }) => {
    const [_key, category, sort, filter, min, max] = queryKey;
    const response = await fetch(`${api}flower/category/${category}?access_token=${accessToken}&sort=${sort}&type=${filter}&range_min=${min}&range_max=${max}`);
    return response.json();
  }