import os
import sys
from distutils.core import setup


class NodeModulesMissing(Exception):
    "raised when node_modules directory is not found"
    pass


if 'develop' in sys.argv or any(a.startswith('bdist') for a in sys.argv):
    import setuptools

# Ensure that js has been built. This does not guarantee that the packages
# are up to date. In the future we might do a more expensive check
# involving file hashes, but only on sdist and bdist builds.
if not os.path.exists('node_modules'):
    raise NodeModulesMissing("Before Python package can be installed or built, "
                             "JavaScript components must be built using npm. "
                             "Run the following and then retry: "
                             "\nnpm install")

setup_args = dict(
    name                 = 'jupyterlab_circuits',
    version              = '0.1.0',
    packages             = ['jupyterlab_circuits'],
    author               = 'David Rapisarda',
    author_email         = 'mridsole@gmail.com',
    keywords             = ['jupyterlab', 'jupyterlab extension'],
    include_package_data = True,
    install_requires = [
        'jupyterlab>=0.17.0',
    ]
)

if __name__ == '__main__':
    setup(**setup_args)
