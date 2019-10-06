import { Form, Input, TextArea, Button, Image, Message, Header, Icon, FormGroup } from 'semantic-ui-react'
import { useState } from 'react'

const INITIAL_PRODUCT = {
  name: "",
  price: "",
  media: "",
  description: ""
}

function CreateProduct() {
  const [product, setProduct] = useState(INITIAL_PRODUCT)
  const [mediaPreview, setMediaPreview] = useState('')
  const [success, setSuccess] = useState(false)

  const handleChange = (e) => {
    const { name, value, files } = e.target
    if (name === 'media') {
      setProduct(prevState => ({ ...prevState, media: files[0] }))
      setMediaPreview(window.URL.createObjectURL(files[0]))
    }
    else {
      setProduct(prevState => ({ ...prevState, [name]: value }))
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log(product)
    setProduct(INITIAL_PRODUCT)
    setSuccess(true)
  }

  return (
    <>
      <Header as="h2" block>
        <Icon name="add" color="orange" />
        Create New Product
      </Header>
      <Form success={success} onSubmit={handleSubmit}>
        <Message success icon="check" header="Success!" content="Your product has been successfully added" />
        <Form.Group widths="equal">
          <Form.Field control={Input} value={product.name} name="name" label="Name" placeholder="Name" type="text" onChange={handleChange} />
          <Form.Field control={Input} value={product.price} name="price" label="Price" placeholder="Price" min="0.00" step="0.01" type="number" onChange={handleChange} />
          <Form.Field control={Input} name="media" label="Media" content="Select Image" type="file" accept="image/*" onChange={handleChange} />
        </Form.Group>
        <Image src={mediaPreview} rounded centered size="small" />
        <Form.Field control={TextArea} value={product.description} name="description" label="Description" placeholder="Description" type="text" onChange={handleChange} />
        <Form.Field control={Button} color="blue" icon="pencil alternate" content="Submit" type="submit" />
      </Form>
    </>
  );
}

export default CreateProduct;
