import * as path from 'path';
import { Context } from '../../core/Context';
import { pluginJSONHandler } from './plugin_json';
import { pluginLinkHandler } from './plugin_link';
import { pluginLessCapture } from './plugin_less';
import { createStylesheetProps } from '../../config/createStylesheetProps';
import { LINK_ASSUMPTION_EXTENSIONS } from '../../config/extensions';
import { pluginStylusCapture } from './plugin_stylus';

export function pluginAssumption() {
  return (ctx: Context) => {
    ctx.ict.on('bundle_resolve_module', props => {
      if (!props.module.captured) {
        const ext = path.extname(props.module.props.absPath);
        if (ext === '.json') {
          pluginJSONHandler(props.module, {});
        } else if (LINK_ASSUMPTION_EXTENSIONS.indexOf(ext) > -1) {
          pluginLinkHandler(props.module, {});
        } else if (ext === '.less') {
          pluginLessCapture({
            ctx,
            module: props.module,
            opts: {
              stylesheet: createStylesheetProps({ ctx, stylesheet: {} }),
            },
          });
        } else if (ext === '.styl') {
          pluginStylusCapture({
            ctx,
            module: props.module,
            opts: {
              stylesheet: createStylesheetProps({ ctx, stylesheet: {} }),
            },
          });
        }
      }
      return props;
    });
  };
}