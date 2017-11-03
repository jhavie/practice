export default {

    name: 'EpCol',

    props: {
        col: {
            type: Number,
            default: 24
        },
        offset: Number,
        pull: Number,
        push: Number,
        xs: [Number],
        sm: [Number],
        md: [Number],
        lg: [Number]
    },

    computed: {
        gutter() {
            return this.$parent.gutter;
        },

        style() {
            const gutter = this.gutter;
            let re = {}

            if (typeof gutter === 'number') {
                re.paddingLeft = `${gutter}px`;
                re.paddingRight = `${gutter}px`;
            } else if (typeof gutter === 'object') {
                if (gutter.hasOwnProperty('size') && gutter.hasOwnProperty('style')) {
                    re.paddingLeft = `${gutter.size}${gutter.style}`;
                    re.paddingRight = `${gutter.size}${gutter.style}`;
                }
            }
            return re;
        }
    },

    render(h) {
        let { style } = this;
        let classList = [];

        ['col', 'offset', 'pull', 'push'].forEach(layout => {
            if (this[layout]) {
                classList.push(
                    layout !== 'col' ?
                    `ep-col-${layout}-${this[layout]}` :
                    `ep-col-${this[layout]}`
                );
            }
        });

        ['xs', 'sm', 'md', 'lg'].forEach(size => {
            if (this[size]) {
                classList.push(
                    classList.push(`ep-col-${size}-${this[size]}`)
                );
            }
        });
        return (
            <div 
                class = {['ep-col', classList] }
                style = { style }> { this.$slots.default } </div>
        );
    }
}