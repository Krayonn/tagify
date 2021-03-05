import React, { Component } from 'react';
import scssStyles from './Track.module.scss';
import { connect } from 'react-redux';

import Tag from '../../Tag/Tag';
import * as actions from '../../../store/action'

class Track extends Component {

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
        const input = event.target.value;
        this.props.onUpdateTag(trackId, tagId, input);
    }

    render() {
        let tags = null;
        const allTags = this.props.tags
        if (allTags) {
            for (let trackId of Object.keys( allTags )){
                if (trackId === this.props.id) {
                    tags = Object.values(allTags[trackId]).map(tag => {
                        const tagId = Object.keys(allTags[trackId]).find(key => allTags[trackId][key] === tag);
                        return <Tag
                            tagName={tag}
                            updateTag={(event) => this.updateTagHandler(trackId, tagId, event)}
                            deleteTag={() => this.removeTagHandler(trackId, tagId)}
                            colour={this.props.tagColours[tag]}
                            tagId={tagId}
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