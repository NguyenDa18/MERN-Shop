import axios from 'axios';
import ProductSummary from '../../components/Product/ProductSummary';
import ProductAttributes from '../../components/Product/ProductAttributes';
import baseUrl from '../../utils/baseUrl';

const Product = ({ product, user }) => {
    return (
        <>
            <ProductSummary {...product} user={user} />
            <ProductAttributes {...product} user={user} />
        </>
    );
};

Product.getInitialProps = async ({ query: { _id } }) => {
    try {
        const url = `${baseUrl}/api/product`
        const payload = { params: { _id } }
        const response = await axios.get(url, payload)
        return {
            product: response.data
        };
    }
    catch (err) {
        console.log(err)
    }
};

export default Product;