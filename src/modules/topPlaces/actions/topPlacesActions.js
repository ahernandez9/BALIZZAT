export const downloadTopPlaces = () => async (dispatch) => {

    let topPlaces = [
        {
            name: "Pool first floor", description: " Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec eget porttitor odio. Aliquam luctus lectus sem, ut mattis augue bibendum sed. Morbi ex massa, aliquet id nunc quis, tristique posuere ipsum. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Fusce pharetra lacus eget lorem mattis, at semper nulla pretium. Maecenas vitae vestibulum velit. Fusce condimentum, velit et mattis placerat, lectus enim consequat risus, a congue massa mi eu nibh. Nullam rutrum massa eu pretium interdum. Nam tortor tellus, condimentum vitae elementum eu, egestas et mi. Cras accumsan sapien a justo sagittis pharetra. Praesent ultricies massa quis mauris luctus, quis semper dolor mattis.\n" +
                "\n" +
                "Sed euismod sed urna eget aliquet. In nec fermentum elit. Sed vel dui rutrum dolor finibus finibus eget volutpat eros. In tempus tristique nisl et placerat. Maecenas condimentum sapien vitae vulputate vestibulum. Ut porta blandit dolor, et bibendum quam. Maecenas mollis mollis pretium. Fusce nec orci ultrices, eleifend arcu vel, aliquet enim. In bibendum maximus sem et mollis. Quisque eget mauris nulla. Ut a mauris ipsum. Donec in sapien ut neque dictum euismod vitae eu dolor. Suspendisse sodales eleifend orci pharetra egestas. Ut vitae scelerisque turpis. Phasellus justo odio, vehicula quis arcu eget, consectetur posuere nisi. Cras efficitur porttitor ornare. ",
            image: undefined, position: undefined
        },
       {
            name: "Tiki Bar" ,description: " Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec eget porttitor odio. Aliquam luctus lectus sem, ut mattis augue bibendum sed. Morbi ex massa, aliquet id nunc quis, tristique posuere ipsum. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Fusce pharetra lacus eget lorem mattis, at semper nulla pretium. Maecenas vitae vestibulum velit. Fusce condimentum, velit et mattis placerat, lectus enim consequat risus, a congue massa mi eu nibh. Nullam rutrum massa eu pretium interdum. Nam tortor tellus, condimentum vitae elementum eu, egestas et mi. Cras accumsan sapien a justo sagittis pharetra. Praesent ultricies massa quis mauris luctus, quis semper dolor mattis.\n" +
                "\n" +
                "Sed euismod sed urna eget aliquet. In nec fermentum elit. Sed vel dui rutrum dolor finibus finibus eget volutpat eros. In tempus tristique nisl et placerat. Maecenas condimentum sapien vitae vulputate vestibulum. Ut porta blandit dolor, et bibendum quam. Maecenas mollis mollis pretium. Fusce nec orci ultrices, eleifend arcu vel, aliquet enim. In bibendum maximus sem et mollis. Quisque eget mauris nulla. Ut a mauris ipsum. Donec in sapien ut neque dictum euismod vitae eu dolor. Suspendisse sodales eleifend orci pharetra egestas. Ut vitae scelerisque turpis. Phasellus justo odio, vehicula quis arcu eget, consectetur posuere nisi. Cras efficitur porttitor ornare. ",
            image: undefined, position: undefined
        },
        {
            name:  "Fabio's room ;)", description: " Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec eget porttitor odio. Aliquam luctus lectus sem, ut mattis augue bibendum sed. Morbi ex massa, aliquet id nunc quis, tristique posuere ipsum. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Fusce pharetra lacus eget lorem mattis, at semper nulla pretium. Maecenas vitae vestibulum velit. Fusce condimentum, velit et mattis placerat, lectus enim consequat risus, a congue massa mi eu nibh. Nullam rutrum massa eu pretium interdum. Nam tortor tellus, condimentum vitae elementum eu, egestas et mi. Cras accumsan sapien a justo sagittis pharetra. Praesent ultricies massa quis mauris luctus, quis semper dolor mattis.\n" +
                "\n" +
                "Sed euismod sed urna eget aliquet. Se sabe que es el puto amo. Sed vel dui rutrum dolor finibus finibus eget volutpat eros. In tempus tristique nisl et placerat. Maecenas condimentum sapien vitae vulputate vestibulum. Ut porta blandit dolor, et bibendum quam. Maecenas mollis mollis pretium. Fusce nec orci ultrices, eleifend arcu vel, aliquet enim. In bibendum maximus sem et mollis. Quisque eget mauris nulla. Ut a mauris ipsum. Donec in sapien ut neque dictum euismod vitae eu dolor. Suspendisse sodales eleifend orci pharetra egestas. Ut vitae scelerisque turpis. Phasellus justo odio, vehicula quis arcu eget, consectetur posuere nisi. Cras efficitur porttitor ornare. ",
            image: undefined, position: undefined
        },
    ];

    dispatch({
        type: 'DOWNLOAD_TOPPLACES',
        payload: topPlaces
    })
};
export const loader = () => (dispatch) => {

}