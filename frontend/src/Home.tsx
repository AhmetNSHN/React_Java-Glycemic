import React, { useEffect, useState } from 'react';
import { allFoodsList, userAndAdminLogin } from './Services';
import { ToastContainer, toast } from 'react-toastify';
import { IFoods, ResultFoods } from './models/IFoods';
import FoodsItem from './components/ItemCard';
import { Button, Card, Dropdown, Form, Grid, Header, Icon, Input, Label, Modal, Pagination, Select } from 'semantic-ui-react';
import SiteMenu from './components/SiteMenu';
import { categories } from './Datas';

// admin kisminin olmasilazim home da
export default function Home() {

  const options = [
    { key: 'k', text: 'Kategori Seç', value: '' },
    { key: 'm', text: 'Male', value: 'male' },
    { key: 'f', text: 'Female', value: 'female' },
    { key: 'o', text: 'Other', value: 'other' },
  ]

  const [foodsArr, setFoodsArr] = useState<ResultFoods[]>([]);
  const [searchArr, setSearchArr] = useState<ResultFoods[]>([]);

  // select category
  const [selectCategory, setSelectCategory] = useState(0)
  const [searchData, setSearchData] = useState("")

  // pages ------------------------------------------
  const [itemStart, setItemStart] = useState(0);
  const [itemFinish, setItemFinish] = useState(8);


  useEffect(() => {

    toast.loading("Yükleniyor.")
    allFoodsList().then(res => {
      const dt: IFoods = res.data;
      setFoodsArr(dt.result!)
      setSearchArr(dt.result!)
      toast.dismiss();
    }).catch(err => {
      toast.dismiss();
      toast.error("" + err)
    })

    // userAndAdminLogin("admin@mail.com", "12345").then(res => {
    //   console.log(res.data)})

  }, []);


  const search = (q: string) => {

    if (q === "") {
      setFoodsArr(searchArr)
    } else {
      q = q.toLowerCase()
      const newArr = searchArr.filter(item => item.name?.toLowerCase().includes(q))
      setFoodsArr(newArr)
    }
  }

  const changePage = (page: string) => {
    const selectedpage = Number(page)
    if (selectedpage === 1) {
      setItemStart(0)
    }
    else {
      setItemStart(8 * (selectedpage - 1))
    }
    setItemFinish(8 * selectedpage)
  }

  const catOnChange = (str: string) => {
    const numCat = parseInt(str)
    setSelectCategory(numCat)

    console.log(numCat)

    var newArr: ResultFoods[] = searchArr
    if (numCat !== 0) {
      newArr = newArr.filter(item => item.cid === numCat)
    }

    if (searchData !== "") {
      newArr = newArr.filter(item => item.name?.toLowerCase().includes(searchData) || ("" + item.glycemicindex).includes(searchData))
    }
    setFoodsArr(newArr)

    console.log(newArr)

  }


  return (
    <>
      <ToastContainer />
      <SiteMenu />

      <Grid columns='2'>
        <Grid.Row>
          <Grid.Column>
            <Grid>
              <Grid.Row>
                <Grid.Column width='14'>
                  <Input onChange={(e) => search(e.target.value)} fluid icon='search' placeholder='Arama...' />
                </Grid.Column>
                <Grid.Column width='2'>
                  <Label color='blue' style={{ display: 'flex', justifyContent: 'center', fontSize: 16 }} >
                    {foodsArr.length}
                  </Label>
                </Grid.Column>
              </Grid.Row>
            </Grid>
          </Grid.Column>

          <Grid.Column>
            <Select onChange={(e, data) => catOnChange("" + data.value)} fluid placeholder='Kategori Seç' options={categories} />
          </Grid.Column>

        </Grid.Row>
      </Grid>

      <Grid >
        {foodsArr.slice(itemStart, itemFinish).map((item, index) =>
          <FoodsItem key={index} item={item} />
        )}

      </Grid>

      <Grid>
        <Pagination defaultActivePage={1} totalPages={Math.ceil(foodsArr.length / 8)}
          onPageChange={(e, { activePage }) => {
            changePage(activePage?.toString()!);
            console.log(activePage);
          }} />
      </Grid>
    </>
  );
}

