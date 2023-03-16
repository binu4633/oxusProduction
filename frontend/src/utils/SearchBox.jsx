import React,{useState} from "react";
import {useDispatch} from 'react-redux';
import classes from './SearchBox.module.css';
import {useNavigate} from 'react-router-dom';
import searchIcon from '../imageCl/search.svg';
import {fetchProducts} from '../reduxStore/user/fetchProductsSlice';
import {addSearchKeyword} from '../reduxStore/user/uiSlice'

function SearchBox() {
  const dispatch = useDispatch();
const [keyWord,setKeyWord] = useState('');
const navigate = useNavigate();

// console.log('key',keyWord)

const serachSubmitHandler = async(e)=>{
  e.preventDefault();
  if(keyWord.trim().length > 0){
    const query = `?keyword=${keyWord.trim()}`;
    dispatch(fetchProducts(query))  ;
    dispatch(addSearchKeyword(query))
 //  const result = await axios.get(`/api/test/testSearch?keyword=${keyWord.trim()}`)
     navigate("/products");
  }
  
// console.log(result.data)
}

  return (
    <div>
      <form className={classes.search} onSubmit={serachSubmitHandler}>
     
        <input
          type="text"
          name=""
          id=""
          placeholder="search"
          className={classes.input}
          onChange={(e) => setKeyWord(e.target.value)}
        />
        
        
     
        <button className={classes.search__btn}>
          
            <img src={searchIcon} alt="" />
        
        </button>
  </form>
    </div>
  );
}

export default SearchBox;
