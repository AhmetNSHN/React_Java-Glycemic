import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify'
import { Form, Header, InputOnChangeData, Segment } from 'semantic-ui-react'
import SiteMenu from './components/SiteMenu'
import { categories } from './Datas';
import { IFoods, ISingleFoods, ResultFoods } from './models/IFoods';
import { foodAdd, save } from './Services';
import { autControl } from './Util';

export default function FoodsAdd() {

  // form item states
  const [name, setName] = useState("")
  const [glycemicindex, setGlycemicindex] = useState(0)
  const [source, setSource] = useState("")
  const [cid, setCid] = useState('0')
  const [base64Image, setBase64Image] = useState("")

  const navigate = useNavigate()

  // animation
  const [visible, setVisible] = useState(false)

  const fncSend = () => {
    toast.loading("Yükleniyor.")
      
    foodAdd( parseInt(cid), name, glycemicindex,  base64Image, source)
    .then(res => { 
      const food:ISingleFoods = res.data
      toast.dismiss(); 
      if ( food.status ) {
        // ekleme başarılı
        toast.success("Ürün ekleme işlemi başarılı") 
        setTimeout(() => {
          navigate("/foodsList")
        }, 1000);        
      }else { 
        toast.error( food.message )
      }
     }).catch(err => {
      toast.dismiss();
      toast.error( "Ürün ekleme işlemi sırasında bir hata oluştu!" )
    })
  } 
  

  useEffect(() => {
    if( autControl() === null ) {
      localStorage.removeItem("user")
      localStorage.removeItem("aut")
      navigate("/")
    }
    setTimeout(() => {
      setVisible(true)
    }, 500);
  }, [])

  
  // image to base64
  const imageOnChange = (e: any, d: InputOnChangeData) => {
    const file = e.target.files[0]
    const size: number = file.size / 1024 // kb
    if (size > 10) { // 10 kb
      toast.error("Lütfen max 10 kb bir resim seçiniz!")
    } else {
      getBase64(file).then(res => {
        setBase64Image("" + res)

      })
    }
  }

  const getBase64 = ( file: any ) => {
    return new Promise(resolve => {
        let fileInfo;
        let baseURL:any = "";
        let reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => {
          baseURL = reader.result
          resolve(baseURL);
        };
        console.log(fileInfo);
      });
  }

  return (
    <>
      <ToastContainer />
      <SiteMenu />
      <Header as='h3' block>
        Gıda Ekle
      </Header>
      <Segment>
        Burada eklediğiniz gıdalar, admin onayını gidip denetimden geçtikten sonra yayına alınır.
      </Segment>

      <Form>
        <Form.Group widths='equal'>
          <Form.Input onChange={(e, d) => setName(d.value)} fluid label='Adı' placeholder='Adı' />
          <Form.Input onChange={(e, d) => setGlycemicindex(parseInt(d.value))} type='number' min='0' max='150' fluid label='Glisemik İndex' placeholder='Glisemik İndex' />
          <Form.Select  label='Kategori' value={cid} fluid placeholder='Kategori' options={categories} search onChange={(e, d) => setCid("" + d.value)} />
        </Form.Group>

        <Form.Group widths='equal'>
          <Form.Input onChange={(e, d) => imageOnChange(e, d)} type='file' fluid label='Resim' placeholder='Resim' />
          <Form.Input onChange={(e, d) => setSource(d.value)} fluid label='Kaynak' placeholder='Kaynak' />
        </Form.Group>

        <Form.Button onClick={(e) => fncSend()} >Gönder</Form.Button>
      </Form>

    </>
  )
}