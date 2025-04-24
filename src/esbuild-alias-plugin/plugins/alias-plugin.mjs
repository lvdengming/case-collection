import path from 'path';
import process from 'process';

export const aliasPlugin = aliases => ({
    name: 'alias',
    setup(build) {
        // 仅匹配路径别名开头的路径
        const aliasRegex = new RegExp(`^${Object.keys(aliases).join('|')}`);
        // namespace: 'file' -> 仅处理文件模块
        build.onResolve({ filter: aliasRegex, namespace: 'file' }, args => {
            // 获取匹配的别名
            const matchedAlias = Object.keys(aliases).find(alias => args.path.startsWith(alias));
            if (matchedAlias) {
                const resolvedPath = args.path
                    .replace(matchedAlias, aliases[matchedAlias])
                    .replace(/\\/g, '/');

                return {
                    path: path.join(process.cwd(), resolvedPath),
                    namespace: 'file'
                };
            }
        });
    }
});
