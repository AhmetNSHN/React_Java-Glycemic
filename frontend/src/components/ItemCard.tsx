import React from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Button, Card, Grid, Icon, Image, Label, SemanticCOLORS } from 'semantic-ui-react';
import { categories } from '../Datas';
import { IFoods, ISingleFoods, ResultFoods } from '../models/IFoods';
import { adminFoodDelete, adminWaitPushFood } from '../Services';
import { basketAdd } from '../Util';

interface itemType {
    item: ResultFoods,
    status?: boolean,
    isAdmin?: boolean,
}


export default function FoodsItem(props: itemType) {

    // enum reduxState {
    //     ADD, DELETE
    //   }

    // const navigate = useNavigate()
    // const dispatch = useDispatch()

    // const glycemicColor = (index: number): SemanticCOLORS => {
    //     var color: SemanticCOLORS = 'red'
    //     if (index > 0 && index < 56) {
    //         color = 'green'
    //     } else if (index > 55 && index < 71) {
    //         color = 'orange'
    //     } else if (index > 70) {
    //         color = 'red'
    //     }
    //     return color;
    // }

    const addBasket = () => {
        basketAdd(props.item)
    }


    // goto detail
    const fncGotoDetail = (url: string) => {
        window.open("/details/" + url, "_blank")
    }

    // goto push
    const fncPush = () => {
        const itm = props.item
        itm.enabled = true
        adminWaitPushFood(itm).then(res => {
            const dt: ISingleFoods = res.data
            if (dt.status === true) {
                window.location.href = "/waitFoodsList"
            }
        }).catch(err => {

        })
    }

    const deleteItem = () => {
        const itm = props.item
        adminFoodDelete(itm.gid!).then(res => {
            const dt: ISingleFoods = res.data
            if (dt.status === true) {
                window.location.href = "/waitFoodsList"
            }
        }).catch(err => {

        })
    }

    const positive = {
        color: "green",
        fontSize: "50px",
        paddingHorizontal: "2px",
        fontFamily: "Arial"

    };

    const neutral = {
        color: "orange",
        fontSize: "50px",
        paddingHorizontal: "2px",
        fontFamily: "Arial"
    }

    const negative = {
        color: "red",
        fontSize: "50px",
        paddingHorizontal: "2px",
        fontFamily: "Arial"
    }

    const mystyle4 = {
        textAlign: "center" as const
    }

    const index = props.item.glycemicindex

    return (
        <Grid.Column mobile={8} tablet={8} computer={4} >
            <Card fluid >
                {/* color={glycemicColor(props.item.glycemicindex!)} */}
                <Card.Content>

                    {props.item.image !== "" &&
                        <Image
                            floated='right'
                            size='tiny'
                            src={props.item.image}
                        />
                    }

                    {props.item.image === "" &&
                        <Image
                            floated='right'
                            size='tiny'
                            src='./food.png'
                        />
                    }

                    {props.status &&
                        <>
                            <Label as='a' color={props.item.enabled === true ? 'blue' : 'red'} ribbon>
                                {props.item.enabled === true ? "Yayında" : "İnceleniyor"}
                            </Label>
                            <Card.Header> {props.item.name} </Card.Header>
                        </>
                    }

                    <Card.Header> {props.item.name} </Card.Header>
                    <Card.Meta>{ categories[props.item.cid!].text }</Card.Meta>

                    <p>
                        glisemik indeksi:
                    </p>
                    <p style={Object.assign({}, index! < 50 ? positive : props.item.glycemicindex! > 70 ? negative : neutral, {
                        fontSize: "50px",
                        paddingHorizontal: "2px",
                        fontFamily: "Arial"
                    })} >
                        {index} </p>


                    {/* <Card.Description>
                        <Card.Meta>{props.item.createdBy === null ? 'user@mail.com' : props.item.createdBy}</Card.Meta>
                        <Card.Meta>{fncDateConvert(props.item.createdDate!)}</Card.Meta>

                        

                    </Card.Description> */}
                </Card.Content>
                <Card.Content extra>
                    <div className='ui two buttons'>
                        {!props.isAdmin &&
                            <>
                                <Button basic color='green' onClick={() => fncGotoDetail(props.item.url!)} >
                                    <Icon name='info' />Detay
                                </Button>

                                <Button onClick={(e, d) => addBasket()} basic color='blue' animated='vertical' >
                                    <Button.Content visible><Icon name='food' />Ekle</Button.Content>
                                    <Button.Content hidden><Icon name='shopping basket' />Ekle</Button.Content>
                                </Button>
                            </>
                        }

                        {props.isAdmin &&
                            <>
                                <Button basic color='green' onClick={() => fncPush()} >
                                    <Icon name='info' />Yayınla
                                </Button>

                                <Button basic color='red' onClick={() => deleteItem()}>
                                    <Icon name='delete' />Sil
                                </Button>
                            </>
                        }
                    </div>
                </Card.Content>
            </Card>
        </Grid.Column >
    );
}