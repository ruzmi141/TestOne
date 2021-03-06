import { useState } from "react";
import {connect} from "react-redux";
import bindActionCreators from "react-redux/es/utils/bindActionCreators";
import {selectGist} from "../../../../app/store/selected/actions";
import "./scss/index.scss";

const Gist = (props) => {
    const [centered, setCentered] = useState(false);
    const { gistInfo, key, selectedGistID } = props;
    const gistFileName = Object.keys(gistInfo.files)[0];
    const selected = gistInfo.id === selectedGistID ? 'selected' : '';

    const moveToCenter = () => {
        setCentered(true);
        setTimeout(() => {
            setCentered(false);
          }, 1000)
    }

    return (
        <div className="gist-layout d-flex align-items-center" key={key} onClick={()=>{props.selectGist(gistInfo.id); moveToCenter()}}>
            <div className={`gist-img-layout ${selected}`}>
                <img src={gistInfo.owner.avatar_url} alt={gistInfo.owner.avatar_url} className={`gist-img ${selected}`}/>
            </div>
            {
                centered &&
                    <img src={gistInfo.owner.avatar_url} alt={gistInfo.owner.avatar_url} className={`gist-img centered`}/>
            }
            {
                <p className={`d-inline mb-0 gist-filename ${selected}`}>{gistFileName}</p>

            }
        </div>
    )
}

const mapStateToProps = (state) => {
    return {
        selectedGistID: state.selectedGist.id
    };
};

const mapDispatchToProps = (dispatch) => bindActionCreators(
    {
        selectGist,
    }, dispatch
);

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Gist);