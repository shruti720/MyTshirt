const stripe = require("stripe").Stripe("sk_test_51Kkg90SBDd311qp27IJLp4a3kWn5vSTpSJ5XbHt8mXYb5YM653Mhnd1JoQmdpneoKYs00NCcGEM0h5gNTrBfVO2E00yS3PM34q")
const uuid = require("uuid/v4")

exports.makePayment = (req, res)=>{
const {token,user, products} = req.body;
console.log("Products:", products);

let amount=0;
    products.map(p=>{
        amount+=p.price;
    });

    let idempotencyKey = uuid();
console.log(user)

    return stripe.customers.create({
        email: "k.deepak33@tcs.com",
        // source: token.id
    }).then(customer =>{
        stripe.paymentIntents
        .create({
            amount:amount*100,
            currency:"usd",
            customer:customer.id,
            receipt_email:token.email,
            description:"a test account",

            shipping:{
                name:token.card.name,
                address:{
                    line1:token.card.address_line1,
                    line2:token.card.address_line2,
                    city:token.card.address_city,
                    country:token.card.address_country,
                    postal_code:token.card.address_zip
                }
            }
        }, {idempotencyKey})
    }).then((response)=>res.status(200).json(response))

}