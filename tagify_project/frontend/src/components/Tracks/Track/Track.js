import React, { Component } from 'react';
import scssStyles from './Track.module.scss';
import { connect } from 'react-redux';

import Tag from '../../Tag/Tag';
import * as actions from '../../../store/action'

class Track extends Component {

    debounce = (func, delay) => {
        let debounceTimer;
        console.log('Debounce!')
        return function () {
            const context = this;
            const args = arguments;
            clearTimeout(debounceTimer);
            debounceTimer =
            setTimeout(() => func.apply(context, args), delay);
        }
    }
    
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

    optUpdateTagHandler = this.debounce(this.updateTagHandler, 500)

    render() {
        let tags = null;
        const allTags = this.props.tags
        if (allTags) {
            for (let trackId of Object.keys( allTags )){
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

        return (
            <div className={scssStyles.track}>

                <div className={scssStyles.track__number}>{this.props.trackNumber}</div>

                <div className={scssStyles.track__title}>{this.props.name}</div>

                {/* provides spacing.. */}
                <div className={scssStyles.track__plays}>{this.props.artist}</div>

                <div className={scssStyles.tags}>
                    {tags}
                </div>

                <div
                    className={scssStyles.track__addTag}
                    onClick={() => this.addTagHandler(this.props.id, this.props.tagSource)}
                >+</div>
            </div>

        )
    }
}

const mapStateToProps = state => {
    return {
        tags: state.tags,
        tagSource: state.tagSource,
        tagColours: state.tagColours
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