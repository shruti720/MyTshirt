import React from 'react';

const Imagehelper = (props) => {

    // let imageURL=`https://images.pexels.com/photos/3561339/pexels-photo-3561339.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940`;

    // if(props.product){
    //     imageURL=`http://localhost:8000/api/product/photo/${props.product._id}`
    // };
    const imageURL = props.product ? `http://localhost:8000/api/product/photo/${props.product._id}` : `https://images.pexels.com/photos/3561339/pexels-photo-3561339.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940`
    console.log(props.product)
    return (
        <div className="rounded border border-success p-2">
              <img
                  src={imageURL}
                  alt="photo"
                  style={{ maxHeight: "100%", maxWidth: "100%" }}
                  className="mb-3 rounded"
                />
              </div>
    );
}

export default Imagehelper;
