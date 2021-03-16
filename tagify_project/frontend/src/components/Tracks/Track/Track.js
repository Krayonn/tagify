import React, { Component } from 'react';
import styles from './Track.module.scss';
import { connect } from 'react-redux';

import Tag from '../../Tag/Tag';
import * as actions from '../../../store/actions/index'

class Track extends Component {

    // debounce = (func, delay) => {
    //     let debounceTimer;
    //     console.log('Debounce!')
    //     return function () {
    //         const context = this;
    //         const args = arguments;
    //         clearTimeout(debounceTimer);
    //         debounceTimer =
    //         setTimeout(() => func.apply(context, args), delay);
    //     }
    // }

    addTagHandler = (trackId, tagName) => {
        if (!this.props.tags[trackId] || !Object.values(this.props.tags[trackId]).includes(tagName)) {
            this.props.onAddTag(trackId, tagName)
        }
    }

    removeTagHandler = (trackId, tagId) => {
        console.log('remove tag handler')
        this.props.onRemoveTag(trackId, tagId)
    }

    updateTagHandler = (trackId, tagId, event) => {
        event.persist();
        this.props.onUpdateTag(trackId, tagId, event.target.value);
    }

    // optUpdateTagHandler = this.debounce(this.updateTagHandler, 500)

    render() {
        let tags = null;
        const allTags = this.props.tags
        if (allTags) {
            for (let trackId of Object.keys(allTags)) {
                if (trackId === this.props.id) {
                    tags = Object.values(allTags[trackId]).map(tag => {
                        const colour = tag.matchColour ? tag.matchColour : tag.colour
                        // const tagId = Object.keys(allTags[trackId]).find(key => allTags[trackId][key] === tag);
                        return <Tag
                            tagName={tag.value}
                            updateTag={(event) => this.updateTagHandler(trackId, tag.id, event)}
                            // updateTag={(event) => this.optUpdateTagHandler(trackId, tagId, event)}
                            deleteTag={() => this.removeTagHandler(trackId, tag.id)}
                            colour={colour}
                            tagId={tag.id}
                        />
                    })
                }

            }
        }
        
        const identifier = this.props.image ? 
            <div className={styles.track__art}><img src={this.props.image}/></div> :
            <div className={styles.track__number}>{this.props.trackNumber}</div>
        console.log('in Track iamge', this.props.image)
        return (
            <div className={styles.track}>

                {identifier}

                <div className={styles.track__title}>{this.props.name}</div>
                <div className={styles.track__title__artists}>{this.props.artists}</div>

                {/* provides spacing.. */}
                <div className={styles.track__divider}></div>
                <div className={styles.tags}>{tags}</div>

                <div
                    className={styles.track__addTag}
                    onClick={() => this.addTagHandler(this.props.id, this.props.tagSource)}
                >+</div>
            </div>

        )
    }
}

const mapStateToProps = state => {
    return {
        tags: state.tag.tags,
        tagSource: state.tag.tagSource,
        tagColours: state.tag.tagColours
    }

}

const mapDispatchToProps = dispatch => {
    return {
        onAddTag: (trackId, tagName) => dispatch(actions.addTag(trackId, tagName)),
        onRemoveTag: (trackId, tagId) => dispatch(actions.removeTag(trackId, tagId)),
        onUpdateTag: (trackId, tagId, input) => dispatch(actions.updateTag(trackId, tagId, input))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Track);