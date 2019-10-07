import { Form, Input, TextArea, Button, Image, Message, Header, Icon, FormGroup } from 'semantic-ui-react'
import { useState, useEffect } from 'react'
import axios from 'axios'

import baseUrl from '../utils/baseUrl'

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
  const [disabled, setDisabled] = useState(true)
  const [loading, setLoading] = useState(false)

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

  const handleImageUpload = async () => {
    const data = new FormData()
    data.append('file', product.media)
    data.append('upload_preset', 'mern-shop')
    data.append('cloud_name', 'dnguyen')
    const response = await axios.post(process.env.CLOUDINARY_URL, data)
    const mediaUrl = response.data.url
    return mediaUrl
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    const mediaUrl = await handleImageUpload()
    console.log({ mediaUrl })
    const url = `${baseUrl}/api/product`
    const payload = { ...product, mediaUrl }
    const response = await axios.post(url, payload)
    console.log({ response })
    setLoading(false)
    setMediaPreview('')
    setProduct(INITIAL_PRODUCT)
    setSuccess(true)
  }

  return (
    <>
      <Header as="h2" block>
        <Icon name="add" color="orange" />
        Create New Product
      </Header>
      <Form loading={loading} success={success} onSubmit={handleSubmit}>
        <Message success icon="check" header="Success!" content="Your product has been successfully added" />
        <Form.Group widths="equal">
          <Form.Field control={Input} value={product.name} name="name" label="Name" placeholder="Name" type="text" onChange={handleChange} />
          <Form.Field control={Input} value={product.price} name="price" label="Price" placeholder="Price" min="0.00" step="0.01" type="number" onChange={handleChange} />
          <Form.Field control={Input} name="media" label="Media" content="Select Image" type="file" accept="image/*" onChange={handleChange} />
        </Form.Group>
        <Image src={mediaPreview} rounded centered size="small" />
        <Form.Field control={TextArea} value={product.description} name="description" label="Description" placeholder="Description" type="text" onChange={handleChange} />
        <Form.Field disabled={loading} control={Button} color="blue" icon="pencil alternate" content="Submit" type="submit" />
      </Form>
    </>
  );
}

export default CreateProduct;
