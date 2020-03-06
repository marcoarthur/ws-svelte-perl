requires 'Mojo::JSON';
requires 'Mojolicious::Lite';
requires 'Mojolicious::Plugin::CORS';
requires 'Mojolicious::Plugin::Webpack';

on test => sub {
    requires 'Mojo::File';
    requires 'Test::Mojo';
    requires 'Test::More';
};


