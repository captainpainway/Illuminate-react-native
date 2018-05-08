import React from 'react';
import { Dimensions, StyleSheet, View, Text, Button, Modal } from 'react-native';

const Size = Dimensions.get('window');

export default class WinModal extends React.Component {
    constructor(props) {
        super(props);
        this.updateVisible = this.props.updateVisible;
    }

    render() {
        return (
            <Modal transparent={true} visible={this.props.visible} onRequestClose={() => {}}>
                <View style={styles.win} elevation={5}>
                    <Text style={styles.winText}>You Win!</Text>
                    <Button title="Restart" color="#111" style={styles.button} onPress={() => {this.updateVisible(false)}}/>
                </View>
            </Modal>
        )
    }
}

const styles = StyleSheet.create({
    win: {
        position: 'absolute',
        top: (Size.height / 2) - 100,
        left: Size.width / 4,
        width: Size.width / 2,
        height: 200,
        backgroundColor: '#333',
        padding: 20,
        borderRadius: 10,
    },
    winText: {
        color: 'white',
        fontSize: 30,
        textAlign: 'center',
        paddingBottom: 20,
    },
});
