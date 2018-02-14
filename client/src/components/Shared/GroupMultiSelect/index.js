import { connect } from "react-redux";
import shortId from "shortid";

import * as actions from "actions/GroupMultiSelect";

import GroupMultiSelect from "./GroupMultiSelect";
import {
    allowFilter,
    flattenSelected,
    getFilterText,
    getPath,
    getUnselectedItems
} from "selectors/GroupMultiSelect";

function mapStateToProps() {
    const cid = shortId.generate();
    return function(state, { items }) {
        const localState = state.groupMultiSelect[cid] || {};
        return {
            cid,
            filterText: getFilterText(localState),
            unselectedItems: getUnselectedItems(localState, items),
            path: getPath(localState),
            selectedItems: flattenSelected(localState),
            showFilter: allowFilter(localState)
        };
    };
}

function mapDispatchToProps(dispatch, {
    items,
    selectedItems,
    onChangePath,
    onSelectItem,
    onSelectAll,
    onDeselectItem,
    onDeselectAll
}) {
    let cid;
    return function() {
        return {
            onChangePath(path) {
                if(typeof(onChangePath)==="function") {
                    console.log("onChangePath inner")
                    onChangePath(path);
                }
            },
            onInit(_cid) {
                cid = _cid;
                dispatch(actions.init(cid, selectedItems));
            },
            onDestroy() {
                dispatch(actions.destroy(cid));
            },
            onFilter(filterText) {
                dispatch(actions.filterList(cid, filterText));
            },
            onSelectItem(item, path) {
                if(typeof(onSelectItem)==="function")
                    onSelectItem(item, path);
                dispatch(actions.selectItem(cid, item, path));
            },
            onDeselectItem(item) {
                if(typeof(onDeselectItem)==="function")
                    onDeselectItem(item, selectedItems);
                dispatch(actions.deselectItem(cid, item, items));
            },
            onSelectAll(currentItems) {
                if(typeof(onSelectAll)==="function")
                    onSelectAll(currentItems);
                dispatch(actions.selectAll(cid, currentItems));
            },
            onDeselectAll() {
                if(typeof(onDeselectAll)==="function")
                    onDeselectAll(items);
                dispatch(actions.deselectAll(cid, items));
            },
            onNav(item) {
                dispatch(actions.navTo(cid, item));
            },
            onNavDown(item) {
                dispatch(actions.navDown(cid, item));
            },
            onNavUp() {
                dispatch(actions.navUp(cid));
            }
        };
    };
}

const GroupMultiSelectContainer = connect(mapStateToProps, mapDispatchToProps)(GroupMultiSelect);

export default GroupMultiSelectContainer;
