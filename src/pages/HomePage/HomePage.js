import React, {useEffect} from 'react'
import './HomePage.scss'
import Slider from '../../components/Slider/Slider'
import CategoriesSection from '../../components/CategoriesSection/CategoriesSection'
import { useDispatch, useSelector } from 'react-redux'
import { fetchCategories, fetchProductsByCategory } from '../../redux/CategorySlice'
import {fetchProducts} from '../../redux/ProductSlice'
import CategorySection from '../../components/CategorySection/CategorySection'

const HomePage = () => {
  const dispatch = useDispatch()
  const {data: categories} = useSelector(state => state.category)

  const {catAllProducts: productsByCategory} = useSelector(state => state.category)
  useEffect(() => {
    dispatch(fetchCategories());
    dispatch(fetchProducts());
    dispatch(fetchProductsByCategory(1, 'ALL'))
  }, [])

  return (
    <div className='homepage' style={{}}>
      <Slider/>
      <CategoriesSection category={categories}/>
      <section>
        {productsByCategory[0] && (
          <CategorySection
            products={productsByCategory[0]}
          />
        )}
      </section>
    </div>
  )
}

export default HomePage
