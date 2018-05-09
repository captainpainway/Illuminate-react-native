import React from 'react';
import { StyleSheet, Dimensions, View, TouchableWithoutFeedback, Animated, Vibration } from 'react-native';
import WinModal from "./WinModal";
import Icon from 'react-native-vector-icons/MaterialIcons';

const number = 5;
const Size = Dimensions.get('window');
const Width = Size.width;
const Cell = Math.floor(Width / (number + 2));

export default class Grid extends React.Component {
    constructor(props) {
        super(props);
        this.colorValue = [[], [], [], [], []];
        this.state = {
            grid: [
                [0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0],
                [0, 0, 1, 0, 0],
                [0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0]
            ],
            modalVisible: false
        };
    }

    componentDidMount() {
        this.randomizeLights();
    }

    randomizeLights() {
        let grid = [[], [], [], [], []];
        for (let i = 0; i < 5; i++) {
            for (let j = 0; j < 5; j++) {
                let rand = Math.round(Math.random());
                grid[i].push(rand);
            }
        }
        this.setState({grid: grid});
    }

    onPress(i, j) {
        let copy = this.state.grid.slice();
        copy[i][j] = +!copy[i][j];
        if (i - 1 >= 0) {
            copy[i - 1][j] = +!copy[i - 1][j];
        }
        if (i + 1 <= (number - 1)) {
            copy[i + 1][j] = +!copy[i + 1][j];
        }
        if (j - 1 >= 0) {
            copy[i][j - 1] = +!copy[i][j - 1];
        }
        if (j + 1 <= (number - 1)) {
            copy[i][j + 1] = +!copy[i][j + 1];
        }
        this.colorChange(copy);
        Vibration.vibrate(10);
        this.winner();
    }

    colorChange(state) {
        state.map((row, i) => {
            row.map((grid, j) => {
                Animated.timing(this.colorValue[i][j], {
                    toValue: grid,
                    duration: 250
                }).start(() => {
                    this.setState({grid: state});
                });
            })
        })
    }

    setCellColor(i, j) {
        this.colorValue[i][j] = new Animated.Value(this.state.grid[i][j]);
        const color = this.colorValue[i][j].interpolate({
            inputRange: [0, 1],
            outputRange: ['#111', '#ffb400']
        });
        return(
            <Animated.View style={[styles.cell, {backgroundColor: color}]}></Animated.View>
        )
    }

    winner() {
        let flatten = [].concat(...this.state.grid);
        function notZero(value) {
            return value > 0;
        }
        let win = flatten.every(notZero);
        if (win) {
            this.winModalVisible(true);
        }
    }

    winModalVisible(visible) {
        this.setState({modalVisible: visible});
    }

    resetGame() {
        this.randomizeLights();
    }

    render() {
        return (
            <View style={styles.container}>
                <Icon name="settings" size={40} style={styles.settings} />
                <WinModal visible={this.state.modalVisible} updateVisible={this.winModalVisible.bind(this)} resetGame={this.resetGame.bind(this)}/>
                {
                    this.state.grid.map((row, i) => {
                        return(
                            <View key={`row${i}`} style={styles.row}>
                                {
                                    row.map((grid, j) => {
                                        return(
                                            <TouchableWithoutFeedback key={`grid${j}`} onPress={() => {this.onPress(i, j)}}>
                                                {this.setCellColor(i, j)}
                                            </TouchableWithoutFeedback>
                                        )
                                    })
                                }
                            </View>
                        )
                    })
                }
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#222',
        alignItems: 'center',
        justifyContent: 'center',
    },
    row: {
        width: (Cell + 10) * number,
        flexDirection: 'row'
    },
    cell: {
        width: Cell,
        height: Cell,
        borderRadius: 10,
        margin: 5,
    },
    settings: {
        color: '#999999',
        position: 'absolute',
        top: 30,
        right: 10,
    }
});
