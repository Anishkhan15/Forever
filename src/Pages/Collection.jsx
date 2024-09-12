import React, { useContext, useEffect, useState } from 'react';
import { ShopContext } from '../Context/ShopContext';
import { assets } from '../assets/assets';
import Title from '../Components/Title';
import ProductItems from '../Components/ProductItems';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Collection = () => {
    const { products, search, showSearch, addToCart } = useContext(ShopContext);
    const [showFilter, setShowFilter] = useState(false);
    const [filterProduct, setFilterProduct] = useState([]);
    const [category, setCategory] = useState([]);
    const [subCategory, setSubCategory] = useState([]);
    const [sortOption, setSortOption] = useState('relevant'); // Default sort option

    const toggleCategory = (e) => {
        const value = e.target.value;
        setCategory((prev) =>
            prev.includes(value) ? prev.filter((item) => item !== value) : [...prev, value]
        );
    };

    const toggleSubCategory = (e) => {
        const value = e.target.value;
        setSubCategory((prev) =>
            prev.includes(value) ? prev.filter((item) => item !== value) : [...prev, value]
        );
    };

    const applyFilter = () => {
        let productsCopy = products.slice();

        if (showSearch && search) {
            productsCopy = productsCopy.filter(item =>
                item.name.toLowerCase().includes(search.toLowerCase())
            );
        }

        // Apply category filter
        if (category.length > 0) {
            productsCopy = productsCopy.filter((item) => category.includes(item.category));
        }

        // Apply subcategory filter
        if (subCategory.length > 0) {
            productsCopy = productsCopy.filter((item) => subCategory.includes(item.subCategory));
        }

        // Apply sorting
        if (sortOption === 'low-high') {
            productsCopy.sort((a, b) => a.price - b.price);
        } else if (sortOption === 'high-low') {
            productsCopy.sort((a, b) => b.price - a.price);
        }

        setFilterProduct(productsCopy);
    };

    useEffect(() => {
        applyFilter();
    }, [category, subCategory, sortOption, products, search, showSearch]);

    const handleAddToCart = (item) => {
        addToCart(item);
        toast.success(`${item.name} added to cart!`);
    };

    return (
        <div className='flex flex-col sm:flex-row gap-1 sm:gap-10 pt-10 border-t'>
            <ToastContainer />
            {/* Filter Options */}
            <div className='min-w-60'>
                <p
                    onClick={() => setShowFilter(!showFilter)}
                    className='my-2 text-xl flex items-center cursor-pointer gap-2'
                >
                    FILTERS
                    <img
                        className={`h-3 sm:hidden ${showFilter ? 'rotate-90' : ''}`}
                        src={assets.dropdown_icon}
                        alt="Dropdown Icon"
                    />
                </p>

                <div className={`border border-gray-300 pl-5 py-3 mt-6 ${showFilter ? '' : 'hidden'} sm:block`}>
                    <p className='mb-3 text-sm font-medium'>CATEGORIES</p>
                    <div className='flex flex-col gap-2 text-sm font-light text-gray-700'>
                        <p className='flex gap-2'>
                            <input className='w-3' type="checkbox" value='Men' onChange={toggleCategory} /> Men
                        </p>
                        <p className='flex gap-2'>
                            <input className='w-3' type="checkbox" value='Women' onChange={toggleCategory} /> Women
                        </p>
                        <p className='flex gap-2'>
                            <input className='w-3' type="checkbox" value='Kids' onChange={toggleCategory} /> Kids
                        </p>
                    </div>
                </div>

                {/* SubCategory */}
                <div className={`border border-gray-300 pl-5 py-3 my-5 ${showFilter ? '' : 'hidden'} sm:block`}>
                    <p className='mb-3 text-sm font-medium'>TYPE</p>
                    <div className='flex flex-col gap-2 text-sm font-light text-gray-700'>
                        <p className='flex gap-2'>
                            <input className='w-3' type="checkbox" value='Topwear' onChange={toggleSubCategory} /> Topwear
                        </p>
                        <p className='flex gap-2'>
                            <input className='w-3' type="checkbox" value='Bottomwear' onChange={toggleSubCategory} /> Bottomwear
                        </p>
                        <p className='flex gap-2'>
                            <input className='w-3' type="checkbox" value='Winterwear' onChange={toggleSubCategory} /> Winterwear
                        </p>
                    </div>
                </div>
            </div>

            {/* Right Side */}
            <div className='flex-1'>
                <div className='flex justify-between text-base sm:text-2xl mb-4'>
                    <Title text1={'ALL'} text2={'COLLECTIONS'} />

                    {/* Product sort */}
                    <select
                        className='border-2 border-gray-300 text-sm px-2 cursor-pointer'
                        value={sortOption}
                        onChange={(e) => setSortOption(e.target.value)}
                    >
                        <option value="relevant">Sort by: Relevant</option>
                        <option value="low-high">Sort by: Low to High</option>
                        <option value="high-low">Sort by: High to Low</option>
                    </select>
                </div>

                {/* Map product */}
                <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 gap-y-6'>
                    {filterProduct.map((item) => (
                        <ProductItems
                            key={item._id}
                            _id={item._id} // Use _id here
                            image={item.image}
                            name={item.name}
                            price={item.price}
                            onAddToCart={() => handleAddToCart(item)} // Add onAddToCart handler
                        />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Collection;
