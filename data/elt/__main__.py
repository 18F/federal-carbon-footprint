import click

from .build import build_all
from .context import Context
from .extract import extract_all


@click.group()
@click.pass_context
def main(ctx: click.Context) -> None:
    ctx.obj = Context()


@main.command()
@click.pass_context
def extract(ctx: click.Context):
    """
    Acquire current versions of all source data.
    """
    extract_all(ctx.obj)


@main.command()
@click.pass_context
def build(ctx: click.Context):
    """
    Transform raw data to format suitable for visualizations, and write to disk.
    """
    build_all(ctx.obj)


if __name__ == "__main__":
    main()
