import React from 'react';
import { StyleSheet, Text, View, FlatList, TouchableOpacity } from 'react-native';

export default class App extends React.Component {

	constructor(props){
		super(props);

		this.state = {
			loading: false,
			pokemon: [],
			url_base: 'https://pokeapi.co/api/v2/pokemon',
		}
	}

	componentDidMount(){
		this.getPokemon(this.state.url_base)
	}

	getPokemon (url){
		this.setState({
			loading: true
		})

		fetch(url).then(resp => resp.json()).then(resp => {
			this.setState({
				pokemon: resp.results,
				loading: false
			})
		})
	}

	render() {

		if(this.state.loading){
			return (
				<View style={styles.container}>
				<Text>Descargando Pokemon!</Text>
				</View>
			);
		}

		return (
			<View style={styles.container}>
				<FlatList
					data={this.state.pokemon}
					renderItem={
						({item}) => <Text style={styles.text}>{item.name}</Text>
					}
					keyExtractor={(item, index) => index.toString()}
					style={styles.list}
				/>
			</View>
		);
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#fff',
		alignItems: 'center',
		justifyContent: 'center',
	},
	list:{
		padding: 40,
	},
	text: {
		backgroundColor: 'red',
		padding: 10,
		color: '#fff'
	}
});
