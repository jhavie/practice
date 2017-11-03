import { on, off } from "../utils/dom";
/**
 * 动态销毁实例
 * User: merjiezo
 * Date: 2017/3/4
 * Time: 下午22:36
 */
export default {

	methods: {
		destoryEle () {
			off(this.$el, 'transitionend',this.destoryEle);
			this.$destroy(true);
			this.$el.parentNode.removeChild(this.$el);
		}
	},

	watch: {
		closed (val) {
			if (val) {
				this.visible = false;
				on(this.$el, 'transitionend', this.destoryEle);
			}
		}
	}
}