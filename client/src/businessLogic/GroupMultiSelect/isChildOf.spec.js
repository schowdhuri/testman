import { expect } from "chai";

import isChildOf from "./isChildOf";

describe("Utils::isChildOf", () => {

    it("should return true if node1 is a child of node2", () => {
        const node1 = {
            id: "Bangalore",
            name: "Bangalore",
            path: [{
                id: "countries"
            }, {
                id: "India"
            }, {
                id: "Karnataka"
            }]
        };
        const node2 = {
            id: "Karnataka",
            name: "Karnataka",
            path: [{
                id: "countries"
            }, {
                id: "India"
            }]
        };
        expect(isChildOf(node1, node2)).to.be.true;
    });

    it("should return false if node1 and node2 have the same path", () => {
        const node1 = {
            id: 10,
            name: "node 1",
            path: [{
                id: "level 1"
            }, {
                id: "level 2"
            }, {
                id: "level 3"
            }]
        };
        const node2 = {
            id: 20,
            name: "node 2",
            path: [{
                id: "level 1"
            }, {
                id: "level 2"
            }, {
                id: "level 3"
            }]
        };
        expect(isChildOf(node1, node2)).to.not.be.true;
    });

    it("should return false if node1 and node2 have disjoint paths", () => {
        const node1 = {
            id: 10,
            name: "node 1",
            path: [{
                id: "level 1"
            }, {
                id: "level 2"
            }, {
                id: "level 3"
            }]
        };
        const node2 = {
            id: 20,
            name: "node 2",
            path: [{
                id: "level 4"
            }, {
                id: "level 5"
            }]
        };
        expect(isChildOf(node1, node2)).to.not.be.true;
    });

    it("should return false if node2 is a descendant of node1", () => {
        const node1 = {
            id: 10,
            name: "node 1",
            path: [{
                id: "level 1"
            }, {
                id: "level 2"
            }, {
                id: "level 3"
            }]
        };
        const node2 = {
            id: 20,
            name: "node 2",
            path: [{
                id: "level 1"
            }, {
                id: "level 2"
            }, {
                id: "level 3"
            }, {
                id: "level 4"
            }]
        };
        expect(isChildOf(node1, node2)).to.not.be.true;
    });

    it("should return false if node1 and node2 share an ancestor", () => {
        const node1 = {
            id: 10,
            name: "node 1",
            path: [{
                id: "level 1"
            }, {
                id: "level 2"
            }, {
                id: "level 3"
            }]
        };
        const node2 = {
            id: 20,
            name: "node 2",
            path: [{
                id: "level 1"
            }]
        };
        expect(isChildOf(node1, node2)).to.not.be.true;
    });

});
