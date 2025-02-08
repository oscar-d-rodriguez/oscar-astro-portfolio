import postcssNested from "postcss-nested";
import autoprefixer from "autoprefixer";
import postcssMixins from "postcss-mixins";
import postcssCustomMedia from "postcss-custom-media";

export default {
   plugins: [
      autoprefixer(),
      postcssNested(),
      postcssMixins(),
      postcssCustomMedia(),
   ],
};
