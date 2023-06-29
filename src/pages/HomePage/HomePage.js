import React, {useEffect} from 'react'
import './HomePage.scss'
import Slider from '../../components/Slider/Slider'
import CategoriesSection from '../../components/CategoriesSection/CategoriesSection'
import { useDispatch, useSelector } from 'react-redux'
import { fetchCategories, fetchProductsByCategory } from '../../redux/CategorySlice'
import {fetchProducts} from '../../redux/ProductSlice'
import CategorySection from '../../components/CategorySection/CategorySection'
import ProductList from '../../components/ProductList/ProductList'

const HomePage = () => {
  const dispatch = useDispatch()
  const {data: categories} = useSelector(state => state.category)
  const {data: products} = useSelector(state => state.product)
  const {catAllProducts: productsByCategory} = useSelector(state => state.category)
  useEffect(() => {
    dispatch(fetchCategories());
    dispatch(fetchProducts());
    dispatch(fetchProductsByCategory(1, 'ALL'))
    dispatch(fetchProductsByCategory(2, 'ALL'))
    dispatch(fetchProductsByCategory(3, 'ALL'))
    dispatch(fetchProductsByCategory(4, 'ALL'))
    dispatch(fetchProductsByCategory(5, 'ALL'))
  }, [])

  return (
    <div className='homepage' style={{}}>
      <Slider/>
      <CategoriesSection category={categories}/>
      <ProductList products={products} />
      <section>
        {productsByCategory[0] && (
          <CategorySection
            products={productsByCategory[0]}
          />
        )}
      </section>
      <section>
        {productsByCategory[1] && (
          <CategorySection
            products={productsByCategory[1]}
          />
        )}
      </section>
      <section>
        {productsByCategory[2] && (
          <CategorySection
            products={productsByCategory[2]}
          />
        )}
      </section>
      <section>
        {productsByCategory[3] && (
          <CategorySection
            products={productsByCategory[3]}
          />
        )}
      </section>
      <section>
        {productsByCategory[4] && (
          <CategorySection
            products={productsByCategory[4]}
          />
        )}
      </section>
    </div>
  )
}

export default HomePage
