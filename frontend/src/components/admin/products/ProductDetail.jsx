import React, { useEffect, useState, useRef } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  findAdminProductDetail,
  productDetail,
  collectionStatus,
  prDetailError,
  imageCollection,
  imageError,
  findAdminColors
} from "../../../reduxStore/adminProduct/productCollectionSlice";
import { updateProduct } from "../../../reduxStore/adminProduct/productUpdateSlice";
import classes from "./ProductDetail.module.css";
function ProductDetail() {
  const params = useParams();
  const dispatch = useDispatch();

  const prd = useSelector(productDetail);
  const stats = useSelector(collectionStatus);
  const apiError = useSelector(prDetailError);

  const images = useSelector(imageCollection);
  const apiImageError = useSelector(imageError)

  const [nameUpdateShow, setNameUpdateShow] = useState(false);
  const [brandUpdateShow, setBrandUpdateShow] = useState(false);
  const [descUpdateShow, setDescUpdateShow] = useState(false);
  const [priceUpadateShow, setPriceUpdateShow] = useState(false);
  const [discountUpadateShow, setDiscountUpdateShow] = useState(false);
  const [publishUpadateShow, setPublishUpdateShow] = useState(false);
  const [coverUpadateShow, setCoverUpdateShow] = useState(false);
  const [coverImage, setCoverImage] = useState("");

  const nameRef = useRef();
  const brandRef = useRef();
  const descRef = useRef();
  const priceRef = useRef();
  const discountRef = useRef();
  const publishRef = useRef();

  //   console.log('params is', params.id);

  useEffect(() => {
    dispatch(findAdminProductDetail(params.id));
  }, [params.id]);

  const onNameUpdateDisplay = () => {
    setNameUpdateShow(!nameUpdateShow);
  };
  const onBrandUpdateDisplay = () => {
    setBrandUpdateShow(!brandUpdateShow);
  };

  const onDescUpdateDisplay = () => {
    setDescUpdateShow(!descUpdateShow);
  };
  const onPriceUpdateDisplay = () => {
    setPriceUpdateShow(!priceUpadateShow);
  };
  const onDiscountUpdateDisplay = () => {
    setDiscountUpdateShow(!discountUpadateShow);
  };
  const onPublishUpdateDisplay = () => {
    setPublishUpdateShow(!publishUpadateShow);
  };
  const onCoverUpdateDisplay = () => {
    setCoverUpdateShow(!coverUpadateShow);
  };

  const handleCoverImage = (e) => {
    const imageFile = e.target.files[0];

    // console.log(imageFile);
    tranformFile(imageFile);
  };
  // console.log(coverImage)
  function tranformFile(file) {
    const reader = new FileReader();
    if (file) {
      reader.readAsDataURL(file);
      reader.onloadend = () => {
        setCoverImage(reader.result);
      };
    } else {
      setCoverImage("");
    }
  }

  const onNameUpdateHandler = async (e) => {
    e.preventDefault();

    // console.log(nameRef.current.value)

    const payLoad = {
      id: params.id,
      update: {
        name: nameRef.current.value,
      },
    };
    const response = await dispatch(updateProduct(payLoad));
   

    if (response && response.payload && response.payload.status === "success") {
      dispatch(findAdminProductDetail(params.id));
      setNameUpdateShow(false);
    }
  };
  const onBrandUpdateHandler = async (e) => {
    e.preventDefault();

    // console.log(nameRef.current.value)

    const payLoad = {
      id: params.id,
      update: {
        brand: brandRef.current.value,
      },
    };
    const response = await dispatch(updateProduct(payLoad));
 

    if (response && response.payload && response.payload.status === "success") {
      dispatch(findAdminProductDetail(params.id));
      setBrandUpdateShow(false);
    }
  };
  const onDescUpdateHandler = async (e) => {
    e.preventDefault();

    // console.log(nameRef.current.value)

    const payLoad = {
      id: params.id,
      update: {
        description: descRef.current.value,
      },
    };
    const response = await dispatch(updateProduct(payLoad));
  

    if (response && response.payload && response.payload.status === "success") {
      dispatch(findAdminProductDetail(params.id));
      setDescUpdateShow(false);
    }
  };
  const onPriceUpdateHandler = async (e) => {
    e.preventDefault();

    // console.log(nameRef.current.value)

    const payLoad = {
      id: params.id,
      update: {
        price: priceRef.current.value,
      },
    };
    const response = await dispatch(updateProduct(payLoad));
   

    if (response && response.payload && response.payload.status === "success") {
      dispatch(findAdminProductDetail(params.id));
      setPriceUpdateShow(false);
    }
  };
  const onDiscountUpdateHandler = async (e) => {
    e.preventDefault();

    // console.log(nameRef.current.value)

    const payLoad = {
      id: params.id,
      update: {
        discount: discountRef.current.value,
      },
    };
    const response = await dispatch(updateProduct(payLoad));
   

    if (response && response.payload && response.payload.status === "success") {
      dispatch(findAdminProductDetail(params.id));
      setDiscountUpdateShow(false);
    }
  };
  const onPublishUpdateHandler = async (e) => {
    e.preventDefault();

    // console.log(nameRef.current.value)

    const payLoad = {
      id: params.id,
      update: {
        publish: publishRef.current.value,
      },
    };
    const response = await dispatch(updateProduct(payLoad));
   

    if (response && response.payload && response.payload.status === "success") {
      dispatch(findAdminProductDetail(params.id));
      setPublishUpdateShow(false);
    }
  };
  const onCoverImageUpdateHandler = async (e) => {
    e.preventDefault();

    // console.log(nameRef.current.value)

    const payLoad = {
      id: params.id,
      update: {
        coverImage: coverImage,
      },
    };
    const response = await dispatch(updateProduct(payLoad));
   

    if (response && response.payload && response.payload.status === "success") {
      dispatch(findAdminProductDetail(params.id));
      setCoverUpdateShow(false);
    }
  };

  const colorFetchHandler = (id) => {
   
    dispatch(findAdminColors(id))
  };

  return (
    <div className={classes.wrapper}>
      {prd && (
        <div className={classes.pr__wrapper}>
          <div className={classes.type__box}>
            <p className="p_white">
              category <span className={classes.pr_type}> {prd.category}</span>
            </p>
          </div>
          <div className={classes.type__box}>
            <p className="p_white">
              name <span className={classes.pr_type}> {prd.name}</span>
            </p>
            <button
              className={classes.btn_update}
              onClick={onNameUpdateDisplay}
            >
              update
            </button>
          </div>
          {nameUpdateShow && (
            <div className={classes.type__box}>
              <form
                className={classes.form__update}
                onSubmit={onNameUpdateHandler}
              >
                <label>
                  name:
                  <input type="text" ref={nameRef} />
                </label>
                <button className={classes.btn_update}>update</button>
              </form>
            </div>
          )}

          <div className={classes.type__box}>
            <p className="p_white">
              brand <span className={classes.pr_type}> {prd.brand}</span>
            </p>
            <button
              className={classes.btn_update}
              onClick={onBrandUpdateDisplay}
            >
              update
            </button>
          </div>
          {brandUpdateShow && (
            <div className={classes.type__box}>
              <form
                className={classes.form__update}
                onSubmit={onBrandUpdateHandler}
              >
                <label>
                  brand:
                  <input type="text" ref={brandRef} />
                </label>
                <button className={classes.btn_update}>update</button>
              </form>
            </div>
          )}
          <div className={classes.type__box}>
            <p className="p_white">
              descriptions{" "}
              <span className={classes.pr_type}> {prd.description}</span>
            </p>
            <button
              className={classes.btn_update}
              onClick={onDescUpdateDisplay}
            >
              update
            </button>
          </div>
          {descUpdateShow && (
            <div className={classes.type__box}>
              <form
                className={classes.form__update}
                onSubmit={onDescUpdateHandler}
              >
                <label>
                  description:
                  <textarea type="text" ref={descRef} />
                </label>
                <button className={classes.btn_update}>update</button>
              </form>
            </div>
          )}
          <div className={classes.type__box}>
            <div>
              <p className="p_white">cover image</p>
              <div className={classes.cover__image}>
                <img src={prd.coverImage.image} alt="" />
              </div>
              <button
                className={classes.btn_update}
                onClick={onCoverUpdateDisplay}
              >
                update
              </button>
            </div>
          </div>
          {coverUpadateShow && (
            <div className={classes.type__box}>
              <div className={classes.cover__image}>
                <img src={coverImage} alt="" />
              </div>
              <div>
                <form
                  className={classes.form__update}
                  onSubmit={onCoverImageUpdateHandler}
                >
                  <label>
                    CoverImage:
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleCoverImage}
                    />
                  </label>
                  <button className={classes.btn_update}>update</button>
                </form>
              </div>
            </div>
          )}

          <div className={classes.type__box}>
            <p className="p_white">
              price <span className={classes.pr_type}> {prd.price}</span>
            </p>
            <button
              className={classes.btn_update}
              onClick={onPriceUpdateDisplay}
            >
              update
            </button>
          </div>
          {priceUpadateShow && (
            <div className={classes.type__box}>
              <form
                className={classes.form__update}
                onSubmit={onPriceUpdateHandler}
              >
                <label>
                  price:
                  <input type="number" ref={priceRef} />
                </label>
                <button className={classes.btn_update}>update</button>
              </form>
            </div>
          )}
          <div className={classes.type__box}>
            <p className="p_white">
              discount <span className={classes.pr_type}> {prd.discount}</span>
            </p>
            <button
              className={classes.btn_update}
              onClick={onDiscountUpdateDisplay}
            >
              update
            </button>
          </div>
          {discountUpadateShow && (
            <div className={classes.type__box}>
              <form
                className={classes.form__update}
                onSubmit={onDiscountUpdateHandler}
              >
                <label>
                  discount:
                  <input type="number" ref={discountRef} />
                </label>
                <button className={classes.btn_update}>update</button>
              </form>
            </div>
          )}
          <div className={classes.type__box}>
            <p className="p_white">
              stock
              <span className={classes.pr_type}> {prd.productStockCount}</span>
            </p>
          </div>
          <div className={classes.type__box}>
            <p className="p_white">
              sale<span className={classes.pr_type}> {prd.totalSale}</span>
            </p>
          </div>
          <div className={classes.type__box}>
            <p className="p_white">
              publish
              <span className={classes.pr_type}>
                {" "}
                {prd.publish ? "true" : "false"}
              </span>
            </p>
            <button
              className={classes.btn_update}
              onClick={onPublishUpdateDisplay}
            >
              update
            </button>
          </div>
          {publishUpadateShow && (
            <div className={classes.type__box}>
              <form
                className={classes.form__update}
                onSubmit={onPublishUpdateHandler}
              >
                <label>
                  publish:
                  <select ref={publishRef}>
                    <option value="true">true</option>
                    <option value="false">false</option>
                  </select>
                </label>
                <button className={classes.btn_update}>update</button>
              </form>
            </div>
          )}

          <div className={classes.colors__wrapper}>
            {prd.colors &&
              prd.colors.length > 0 &&
              prd.colors.map((pr) => {
                return (
                  <button
                    className={classes.btn__color}
                    onClick={colorFetchHandler.bind(this, pr.imageCollection)}
                  >
                    <div className={classes.color__box}>
                      <div>
                        <p className="p_white">{pr.color}</p>
                      </div>
                      <div
                        className={classes.color__map}
                        style={{ backgroundColor: `${pr.color}` }}
                      ></div>
                    </div>
                  </button>
                );
              })}
          </div>
          <div className={classes.type__box}>
          <div className={classes.image__cl__wrapper}>
            {images && images.length>0 && images.map(im=>{
                return(
                    <div className={classes.image__cl__box}>
                    <img src={im} alt="" />
                 </div>
                )
            })}
            
          </div>
          </div>
        
          <div className={classes.sku__wrapper}>
            {prd.sku &&
              prd.sku.length > 0 &&
              prd.sku.map((pr) => {
                return (
                  <div className={classes.sku__box}>
                    <div className="p_white">color:{pr.color}</div>
                    <div className="p_white">size:{pr.size}</div>
                    <div className="p_white">qty:{pr.qty}</div>
                  </div>
                );
              })}
          </div>
        </div>
      )}
    </div>
  );
}

export default ProductDetail;
