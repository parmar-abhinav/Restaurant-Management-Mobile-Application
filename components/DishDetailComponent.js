import React, { Component } from 'react';
import { Text, View, ScrollView, FlatList, StyleSheet, Alert, PanResponder } from 'react-native';
import { SafeAreaView, SafeAreaProvider } from 'react-native-safe-area-context';
import { Card, ListItem, Icon, Rating, Input, Button } from 'react-native-elements';
import { baseUrl } from '../shared/baseUrl';
import { connect } from 'react-redux';
import { postFavorite, postComment } from '../redux/ActionCreators';
import { Modal } from 'react-native';
import { Value } from 'react-native-reanimated';
import { comments } from '../redux/comments';
import * as Animatable from 'react-native-animatable';

const mapStateToProps = state => {
    return {
        dishes: state.dishes,
        comments: state.comments,
        favorites: state.favorites
    }
}

const mapDispatchToProps = dispatch => ({
    postFavorite: (dishId) => dispatch(postFavorite(dishId)),
    postComment: (comment) => dispatch(postComment(comment))
})

function RenderDish(props) {

    const dish = props.dish;
    
    const recognizeDrag = ({moveX, moveY, dx, dy}) => {
        if(dx<-50)
            return true;
        else
            return false;
    }

    const recognizeComment = ({moveX, moveY, dx, dy}) => {
        if(dx>50)
            return true;
        else    
            return false;
    }

    handleViewRef = ref => this.view = ref;

    const panResponder = PanResponder.create({
        onStartShouldSetPanResponder: (e, gestureState) => {
            return true;
        },
        onPanResponderGrant: () => {this.view.rubberBand(1000).then(endState => console.log(endState.finished ? 'finished' : 'cancelled'));},

        onPanResponderEnd: (e, gestureState) => {
            console.log("pan responder end", gestureState);
            if (recognizeDrag(gestureState))
                Alert.alert(
                    'Add Favorite',
                    'Are you sure you wish to add ' + dish.name + ' to favorite?',
                    [
                    {text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
                    {text: 'OK', onPress: () => {props.favorite ? console.log('Already favorite') : props.onPress()}},
                    ],
                    { cancelable: false }
                );
            if(recognizeComment(gestureState))
                    props.handleModal();

            return true;
        }
    })

    if (dish != null) {
        return (
            <Animatable.View animation="fadeInDown" duration={2000} delay={1000} {...panResponder.panHandlers} ref={this.handleViewRef}>
            <Card
                featuredTitle={dish.name}
                image={{ uri: baseUrl + dish.image }}>
                <Text style={{ margin: 10 }}>
                    {dish.description}
                </Text>
                <View style={styles.iconsstyle}>
                    <Icon raised reverse name={props.favorite ? 'heart' : 'heart-o'} type="font-awesome" color="#f50" onPress={() => { props.favorite ? console.log('Already Favorite') : props.onPress() }} />
                    <Icon type="font-awesome" name="pencil" raised reverse color="#512DA8" onPress={() => props.handleModal()} />
                </View>
            </Card>
            </Animatable.View>
        );
    }
    else {
        return (<View></View>);
    }
}

function RenderComments(props) {

    const comments = props.comments;


    const renderCommentItem = ({ item, index }) => {

        return (
            <Animatable.View animation="fadeInUp" duration={2000} delay={1000}>
            <View key={index} style={{ margin: 10 }}>
                <Text style={{ fontSize: 14 }}>{item.comment}</Text>
                <View style={{alignItems: 'baseline'}}>
                <Rating
                    type='star'
                    ratingCount={5}
                    imageSize={12}
                    startingValue={item.rating}
                    
                />
                </View>
                <Text style={{ fontSize: 12 }}>{'-- ' + item.author + ', ' + item.date} </Text>
            </View>
            </Animatable.View>
        );
    };

    return (
        <Card title='Comments' >
            <FlatList
                data={comments}
                renderItem={renderCommentItem}
                keyExtractor={item => item.id.toString()}
            />
        </Card>
    );
}

class DishDetail extends Component {

    static navigationOptions = {
        title: 'Dish Details'
    };

    markFavorite(dishId) {
        this.props.postFavorite(dishId);
    }
    constructor(props) {
        super(props)
        this.state = {
            showModal: false,
            rating: 0,
            author: '',
            comment: ''
        }
        this.toggleModal = this.toggleModal.bind(this);
        this.ratingCompleted = this.ratingCompleted.bind(this);
        this.handleComment = this.handleComment.bind(this);
    }

    toggleModal() {
        this.setState({
            showModal: !this.state.showModal
        });
    }

    ratingCompleted(rating) {
        this.setState({
            rating: rating
        }, () => { console.log(this.state.rating) })
    }

    handleComment(dishId) {
        var d = new Date();
        var n = d.toISOString();
        var ans = [{ id: this.props.comments.comments.length, dishId: dishId, rating: this.state.rating, comment: this.state.comment, author: this.state.author, date: n }]
        var result = this.props.comments.comments.concat(ans)
        console.log(result)
        this.props.postComment(result);
        this.toggleModal();
    }

    render() {
        const dishId = this.props.navigation.getParam('dishId', '');

        return (
            <ScrollView>
                <RenderDish handleModal={this.toggleModal} dish={this.props.dishes.dishes[+dishId]} favorite={this.props.favorites.some(el => el === dishId)} onPress={() => { this.markFavorite(dishId) }} />
                <RenderComments comments={this.props.comments.comments.filter((comment) => { return comment.dishId === dishId })} />
                <Modal animationType={"fade"} transparent={false} visible={this.state.showModal} onDismiss={() => this.toggleModal()} onRequestClose={() => this.toggleModal()}>
                    <View>
                        <Rating
                            type='star'
                            ratingCount={5}
                            imageSize={40}
                            showRating
                            style={{ margin: 10 }}
                            onFinishRating={this.ratingCompleted}
                        />
                        <Input placeholder="Author" leftIconContainerStyle={{ margin: 10 }} leftIcon={{ type: 'font-awesome', name: 'user' }} onChangeText={value => this.setState({ author: value }, () => console.log(this.state.author))} />
                        <Input placeholder="Comment" leftIconContainerStyle={{ margin: 10 }} leftIcon={{ type: 'font-awesome', name: 'comment' }} onChangeText={value => this.setState({ comment: value }, () => console.log(this.state.comment))} />
                        <Button
                            onPress={() => { this.handleComment(+dishId) }}
                            buttonStyle={{ backgroundColor: '#512DA8', margin: 10 }}
                            title="Submit"
                        />
                        <Button
                            onPress={() => { this.toggleModal() }}
                            buttonStyle={{ backgroundColor: '#808080', margin: 10 }}
                            title="Cancel"
                        />
                    </View>
                </Modal>
            </ScrollView>
        );
    }
}

const styles = StyleSheet.create({
    iconsstyle: {
        flexDirection: 'row',
        flex: 1,
        textAlign: 'center',
        justifyContent: 'center'
    }
})

export default connect(mapStateToProps, mapDispatchToProps)(DishDetail);