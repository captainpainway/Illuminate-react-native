import React from 'react';
import { StyleSheet, Dimensions, View, TouchableOpacity } from 'react-native';

const number = 5;
const Size = Dimensions.get('window');
const Width = Size.width;
const Cell = Math.floor(Width / (number + 2));

export default class Grid extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            grid: [
                [0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0],
                [0, 0, 1, 0, 0],
                [0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0]
            ]
        }
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
        this.setState({grid: copy})
    }

    render() {
        return (
            <View style={styles.container}>
                {
                    this.state.grid.map((row, i) => {
                        return(
                            <View key={`row${i}`} style={styles.row}>
                                {
                                    row.map((grid, j) => {
                                        return(
                                            <TouchableOpacity key={`grid${j}`} onPress={() => {this.onPress(i, j)}}>
                                                <View style={this.state.grid[i][j] ? styles.illuminate : styles.grid}></View>
                                            </TouchableOpacity>
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
    grid: {
        width: Cell,
        height: Cell,
        borderRadius: 10,
        backgroundColor: '#111',
        margin: 5,
    },
    illuminate: {
        width: Cell,
        height: Cell,
        borderRadius: 10,
        backgroundColor: '#ffb400',
        margin: 5,
    }
});
