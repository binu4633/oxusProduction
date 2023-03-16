// const content = 'something is text '
// const order = [
//     {
//         name:'product one',
//         category: 'shirt',
//         price:450
//     },
//     {
//         name:'product two',
//         category: 'jacket',
//         price:350
//     },
//     {
//         name:'product three',
//         category: 'skirt',
//         price:200
//     },
// ]
const orderEmail = (order)=>{
    return `
    <!DOCTYPE html>
    <html lang="en">
      <head>
        <meta charset="UTF-8" />
        <meta http-equiv="X-UA-Compatible" content="IE=edge" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>order confirm email</title>
        <style>
          body {
            background-color: rgba(235, 121, 10, 1);
            padding-top: 20px;
            color: white;
            box-sizing: border-box;
            padding: 0;
            margin: 0;
          }
          .heading {
            text-align: center;
    
            display: flex;
            justify-content: center;
          }
          .heading > h2 {
            /* background-color: red; */
            padding: 5px 10px;
            border-bottom: 2px solid rgba(95, 60, 26, 1);
          }
          .content {
            padding-left: 50px;
            text-align: center;
            background-color: rgba(95, 60, 26, 1);
            padding: 10px 50px;
            margin-bottom: 50px;
            border-radius: 15px;
          }
          .p__large {
            font-size: 30px;
          }
          .p__medium {
            font-size: 25px;
          }
          .order__wrapper {
            /* padding-left: 50px;  */
            text-align: center;
            display: flex;
            flex-direction: column;
            align-items: center;
          }
          .order__wrapper > h3 {
            font-size: 40px;
          }
          .order {
            display: flex;
            margin-top: 10px;
            background-color: rgba(95, 60, 26, 1);
            align-items: center;
            justify-content: center;
            padding: 20px;
            min-width: 60%;
            border-radius: 20px;
          }
          .or__image {
            width: 300px;
            height: 300px;
            margin-right: 5px;
          }
          .or__image > img {
            width: 100%;
            height: 100%;
            object-fit: contain;
          }
    
          .or_content {
            line-height: 15px;
          }
          .or_content > p {
            font-size: 25px;
          }
    
          .order__heading {
            text-align: center;
          }
          .order__heading > h4 {
            font-size: 40px;
            padding: 10px 30px;
            border-bottom: 2px solid rgba(95, 60, 26, 1);
          }
    
          .price__detail {
            font-size: 30px;
            width: 100%;
            display: flex;
            flex-direction: column;
            align-items: center;
           
          }
          .price__detail >div{
            display: flex;
            background-color: rgba(95, 60, 26, 1);
            min-width: 60%;
            padding: 0 20px;
            justify-content: space-between;
            margin: 3px;
           
          }
          .shipping__detail {
            text-align: center;
            font-size: 25px;
            line-height: 10px;
            background-color: rgba(95, 60, 26, 1);
            min-width: 60%;
            margin-bottom: 10px;
            border-radius: 10px;
    
          }
    
          @media only screen and (max-width: 600px) {
            .order__wrapper {
              padding-left: 0px;
            }
    
            .or__image {
              width: 150px;
              height: 150px;
              
            }
            .or_content > p {
              font-size: 20px;
            }
            .price__detail{
                font-size: 20px;
            }
          }
        </style>
      </head>
      <body>
        <div class="heading">
          <h2>ORDER CONFIRMATION</h2>
        </div>
        <div class="content">
          <p class="p__large">thank you for your order</p>
          <p class="p__medium">
            We have recieved your order and will contact you as soon as your package
            is shipped. You can find your purchase information below.
          </p>
        </div>
    
        <div class="order__wrapper">
            <div class="order__heading">
                <h4>Order summary</h4>
            </div>

            ${order.products.map(or=>{
                return `
                <div class="order">
                <div class="or__image">
                  <img src=${or.image ? or.image :'' } alt="" />
                </div>
                <div class="or_content">
                <p>${or.category}</p>
                <p>${or.name}</p>
                <p>color : ${or.color}</p>
                <p>size :${or.size}</p>
                <p>price : ${or.discountedPrice}</p>
                <p>quantity : ${or.quantity}</p>
                <p>total: ${or.totalPrice}</p>
                </div>
              </div>
                `
            })}
          
        
         
          <div class="order__heading">
            <h4>Order total</h4>
          </div>
          <div class="price__detail">
            <div>
              <p>sub total: </p>
              <p>${order.subTotal}</p>
            </div>
            <div>
              <p>shipping charge:</p>
              <p>${order.shipping_cost}</p>
            </div>
            ${order.discount > 0 ?
                `<div>
                <p>discount: </p>
                <p>${order.discount}</p>
              </div>`:''
            }
           
            <div>
              <p>total: </p>
              <p>${order.total}</p>
            </div>
          </div>
          <div class="order__heading">
            <h4>shipping address</h4>
        </div>
        <div class="shipping__detail">
            
        <p>${order.shippingAddress.name}</p>
        <p>${order.shippingAddress.address}</p>
        <p>${order.shippingAddress.place}</p>
        <p>${order.shippingAddress.city}</p>
        <p>${order.shippingAddress.state}</p>
        <p>${order.shippingAddress.pinCode}</p>
        </div>
        </div>
        
      </body>
    </html>
    
    `
} 


export default orderEmail