import React, { Component } from 'react';
import {
    Switch,
    ScrollView,
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
} from 'react-native';
import * as Animatable from 'react-native-animatable';
import Collapsible from 'react-native-collapsible';
import Accordion from 'react-native-collapsible/Accordion';
import {downloadTopPlaces} from "./actions/topPlacesActions";
import connect from "react-redux/es/connect/connect";
import {TopPlaceHeader} from "./elements/topPlaceHeader";
import {TopPlaceContent} from "./elements/topPlaceContent";

const BACON_IPSUM =
    'Bacon ipsum dolor amet chuck turducken landjaeger tongue spare ribs. Picanha beef prosciutto meatball turkey shoulder shank salami cupim doner jowl pork belly cow. Chicken shankle rump swine tail frankfurter meatloaf ground round flank ham hock tongue shank andouille boudin brisket. ';


const CONTENT = [
    {
        title: 'Bar Tiki-Tiki',
        content: BACON_IPSUM,
        image: require('../../../assets/images/bar_tiki.jpg'),
        floor: '2º Planta'
    },
    {
        title: 'Piscina',
        content: BACON_IPSUM,
        image: require('../../../assets/images/piscina-hotel.jpg'),
        floor: '1º Planta'
    },
    {
        title: 'Parque Infantil',
        content: BACON_IPSUM,
        image: require('../../../assets/images/parque-infantil.jpg'),
        floor: '3º Planta'
    },
    {
        title: 'Restaurante',
        content: BACON_IPSUM,
        image: require('../../../assets/images/restaurante-panogtiramico.jpg'),
        floor: '1º Planta'
    },

];


class TopPlaces extends Component {

    constructor(props) {
        super(props);
        this.state = {
            activeSections: [],
            collapsed: true,
            multipleSelect: false,
        };
    }



    toggleExpanded = () => {
        this.setState({ collapsed: !this.state.collapsed });
    };

    setSections = sections => {
        this.setState({
            activeSections: sections.includes(undefined) ? [] : sections,
        });
    };

    renderHeader = (section, _, isActive) => {
        return (
            <TopPlaceHeader section={section} isActive={isActive}/>

        );
    };
// <Animatable.View
    //     duration={400}
    //     style={[styles.header, isActive ? styles.active : styles.inactive]}
    //     transition="backgroundColor"
    // >
    //     <Text style={styles.headerText}>{section.title}</Text>
    // </Animatable.View>
    renderContent =(section, _, isActive) => {
        return (
            <TopPlaceContent section={section} isActive={isActive}/>
        );
    };
// <Animatable.View
// duration={400}
// style={[styles.content, isActive ? styles.active : styles.inactive]}
// transition="backgroundColor"
// >
// <Animatable.Text animation={isActive ? 'bounceIn' : undefined}>
// {section.content}
// </Animatable.Text>
// </Animatable.View>
    render() {
        const { multipleSelect, activeSections } = this.state;

        return (
            <View style={styles.container}>
                <ScrollView contentContainerStyle={{ paddingTop: 30 }}>
                    <Text style={styles.title}>Here you will find the best places of our hotel</Text>

                    <Accordion
                        activeSections={activeSections}
                        sections={CONTENT}
                        touchableComponent={TouchableOpacity}
                        expandMultiple={multipleSelect}
                        renderHeader={this.renderHeader}
                        renderContent={this.renderContent}
                        duration={400}
                        onChange={this.setSections}
                    />
                </ScrollView>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F5FCFF',
        //paddingTop: Constants.statusBarHeight,
    },
    title: {
        textAlign: 'center',
        fontSize: 18,
        marginBottom: 20,
    },
    header: {
        backgroundColor: '#F5FCFF',
        padding: 10,
    },
    headerText: {
        textAlign: 'center',
        fontSize: 16,
        fontWeight: '500',
    },
    content: {
        padding: 20,
        backgroundColor: '#fff',
    },
    active: {
        backgroundColor: 'rgba(255,255,255,1)',
    },
    inactive: {
        backgroundColor: 'rgba(245,252,255,1)',
    },
    selectors: {
        marginBottom: 10,
        flexDirection: 'row',
        justifyContent: 'center',
    },
    selector: {
        backgroundColor: '#F5FCFF',
        padding: 10,
    },
    activeSelector: {
        fontWeight: 'bold',
    },
    selectTitle: {
        fontSize: 14,
        fontWeight: '500',
        padding: 10,
    },
    multipleToggle: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginVertical: 30,
        alignItems: 'center',
    },
    multipleToggle__title: {
        fontSize: 16,
        marginRight: 8,
    },
});


const mapStateToProps = state => {
        return {
            mapRedux: state.MapReducer,
            scanner: state.RangeReducer

        }
    };

const mapStateToPropsAction = {downloadTopPlaces};


export default connect(mapStateToProps, mapStateToPropsAction)(TopPlaces);
