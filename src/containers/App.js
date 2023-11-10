import React from 'react';
/****** connect permite suscribir este componente (redux-aware) para
 * que pueda acceder al estado (store) */
import { connect } from 'react-redux';
import CardList from '../components/CardList';
import SearchBox from '../components/SearchBox';
import Scroll from '../components/Scroll';
import ErrorBoundary from '../components/ErrorBoundary';
import './App.css';
// Importamos las acciones que vamos a usar
import { setSearchField, requestRobots } from '../actions';

const mapStateToProps = state => {
    return {
        searchField: state.searchRobots.searchField,
        robots: state.requestRobots.robots,
        isPending: state.requestRobots.isPending,
        error: state.requestRobots.error
    }
};
const mapDispatchToProps = (dispatch) => {
    return {
        onSearchChange: (event) => dispatch(setSearchField(event.target.value)),
        onRequestRobots: () => dispatch(requestRobots())
    }
} 

class App extends React.Component {
    componentDidMount() {
        this.props.onRequestRobots()
    }

    render() {
        const filteredRobots = this.props.robots.filter(robot => {
            return robot.name.toLowerCase().includes(this.props.searchField.toLowerCase());
        });
        return this.props.isPending ?
            <h1>Loading</h1> :
            (
                <div className='tc'>
                    <h1 className='f1'>RoboFriends</h1>
                    <SearchBox searchChange={this.props.onSearchChange} />
                    <Scroll>
                        <ErrorBoundary>
                            <CardList robots={filteredRobots} />
                        </ErrorBoundary>
                        <small>Robots lovingly delivered by Robohash.org</small>
                    </Scroll>
                </div>
            )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);