use strict;
use warnings;
use Test::More;
use Mojo::File 'curfile';
use Test::Mojo;

my $script = curfile->dirname->sibling('websocket');
my $t = Test::Mojo->new($script);

# testing the websocket
$t->websocket_ok('/ws')
->send_ok('ok')
->message_ok
->json_message_like('/total' => qr/^\d+$/, 'got correct data from ws');

# Testing the Source event
$t->get_ok('/event')
->status_is(200)
->content_type_like(qr/event-stream/, 'right content type')
->content_like(qr/total/);

done_testing();
