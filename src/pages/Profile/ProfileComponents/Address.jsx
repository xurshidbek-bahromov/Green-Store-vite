import React, { useState } from 'react';
import axios from 'axios';
import { toast } from 'sonner';
const api = import.meta.env.VITE_PUBLIC_GREENSHOP_API

export default function Address() {
    const { user } = JSON.parse(localStorage.getItem("user"));
    const { country: initialCountry, extra_address: initialExtraAddress, state: initialState, street_address: initialStreetAddress, town: initialTown, zip: initialZip } = user?.billing_address;

    const [name, setName] = useState(user?.name || '');
    const [email, setEmail] = useState(user?.email || "")
    const [phone_number, setPhoneNumber] = useState(user?.phone_number || JSON.parse(localStorage.getItem('phone_number')) || '')
    const [surname, setSurname] = useState(user?.surname || '');
    const [country, setCountry] = useState(initialCountry || '');
    const [extra_address, setExtraAddress] = useState(initialExtraAddress || '');
    const [state, setState] = useState(initialState || '');
    const [street_address, setStreetAddress] = useState(initialStreetAddress || '');
    const [town, setTown] = useState(initialTown || '');
    const [zip, setZip] = useState(initialZip || '');
    const _id = user?._id || JSON.parse(localStorage.getItem('user'))?._id;
    const token = user?.token;


    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post(`${api}user/address?access_token=${_id}`, {
                _id,
                name,
                surname,
                country,
                town,
                extra_address,
                state,
                street_address,
                zip,
                email,
                phone_number,

            }, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            toast.success("Address 📍", { description: `Your address has been updated successfully!` });
        } catch (error) {
            toast.error(error.message);
            console.error("Failed to update address", error);
        }
    };

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <div className='flex gap-3 justify-between items-center'>
                    <label className='w-full my-3' >
                        <div className='font-semibold text-sm'> <span className='text-red-500 '>*</span> Fist Name</div>
                        <input className='w-full my-2 py-2 px-3 rounded-lg border bg-white' type="text" value={name} onChange={(e) => setName(e.target.value)} required />
                    </label>
                    <label className='w-full my-3' >
                        <div className='font-semibold text-sm'> <span className='text-red-500 '>*</span> Last Name</div>
                        <input className='w-full my-2 py-2 px-3 rounded-lg border bg-white' type="text" value={surname} onChange={(e) => setSurname(e.target.value)} required />
                    </label>
                </div>
                <div className='flex gap-3 justify-between items-center'>
                    <label className='w-full my-3' >
                        <div className='font-semibold text-sm'> <span className='text-red-500 '>*</span>Country / Region</div>
                        <input className='w-full my-2 py-2 px-3 rounded-lg border bg-white' type="text" placeholder='enter your country / region' value={country} onChange={(e) => setCountry(e.target.value)} required />
                    </label>
                    <label className='w-full my-3' >
                        <div className='font-semibold text-sm'> <span className='text-red-500 '>*</span>Town / City</div>
                        <input className='w-full my-2 py-2 px-3 rounded-lg border bg-white' type="text" placeholder='enter your town / city' value={town} onChange={(e) => setTown(e.target.value)} required />
                    </label>
                </div>
                <div className='flex gap-3 justify-between items-center'>
                    <label className='w-full my-3' >
                        <div className='font-semibold text-sm'> <span className='text-red-500 '>*</span>Street Address</div>
                        <input className='w-full my-2 py-2 px-3 rounded-lg border bg-white' type="text" placeholder='enter your street name and house number' value={street_address} onChange={(e) => setStreetAddress(e.target.value)} required />
                    </label>
                    <label className='w-full my-3' >
                        <div className='font-semibold text-sm'> <span className='text-red-500 '>*</span>Extra Address</div>
                        <input className='w-full my-2 py-2 px-3 rounded-lg border bg-white' type="text" placeholder='enter your Apartment or suitable places (optional)' value={extra_address} onChange={(e) => setExtraAddress(e.target.value)} />
                    </label>
                </div>
                <div className='flex gap-3 justify-between items-center'>
                    <label className='w-full my-3' >
                        <div className='font-semibold text-sm'> <span className='text-red-500 '>*</span>State</div>
                        <input className='w-full my-2 py-2 px-3 rounded-lg border bg-white' type="text" placeholder='enter your state' value={state} onChange={(e) => setState(e.target.value)} />
                    </label>
                    <label className='w-full my-3' >
                        <div className='font-semibold text-sm'> <span className='text-red-500 '>*</span>Zip</div>
                        <input className='w-full my-2 py-2 px-3 rounded-lg border bg-white' type="text" placeholder='enter your town / city zipcode' value={zip} onChange={(e) => setZip(e.target.value)} required />
                    </label>
                </div>
                <div className='flex gap-3 justify-between items-center'>
                    <label className='w-full my-3' >
                        <div className='font-semibold text-sm'> <span className='text-red-500 '>*</span> Email Address</div>
                        <input className='w-full my-2 py-2 px-3 rounded-lg border bg-white' type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
                    </label>
                    <label className='w-full my-3' >
                        <div className='font-semibold text-sm'> <span className='text-red-500 '>*</span> Phone</div>

                        <div className='w-full my-2 flex items-center group active:border-green-500 hover:border-green-500 transition focus:border-green-500 outline-none rounded-lg border bg-white'>
                            <div className='bg-[#FBFBFB] py-2 group-hover:border-r-green-500 transition rounded-l-lg px-3 border-r-2 font-semibold'>
                                +998
                            </div>
                            <input className='w-full outline-none rounded-r-lg py-2 px-3 bg-white' placeholder='phone number' type="text" value={phone_number} onChange={(e) => setPhoneNumber(e.target.value)} required />
                        </div></label>
                </div>

                <button className='bg-[#46A358] hover:bg-[#46A358]/80 text-white py-2 px-3 cursor-pointer rounded font-semibold'>Save My Address</button>
            </form>
        </div>
    )
}
