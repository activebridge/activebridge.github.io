---
author: Viktor Shmigol
author-position: Lead Ruby on Rails developer
background: what-is-the-best-strategy-for-encrypting-files-in-ruby-back
category: engineering
date: "2017-04-05"
layout: post
permalink: blog/:title
post-id: what-is-the-best-strategy-for-encrypting-files-in-ruby
post-title: "What is the best strategy for encrypting files in Ruby"
time-to-read: 2 min
scripts: [post]

author-url: ""
article-body: ""
date-modified: "2020-02-25"
description: "However, now, along with information society foundation cryptography’s became one of the main tools providing
              confidentiality, authorization, electronic payments"
title: "Encryption. Ruby practice"

redirect_from:
  - /blog/article/what-is-the-best-strategy-for-encrypting-files-in-ruby
  - /blog/article/unobtrusive-scripting-adapter-vs-remote-part-ajax-file-uploader
---

## Symmetric encryption in Ruby

In the past Cryptography was used con fines militares. However, now, along with information society foundation cryptography’s became one of the main tools providing confidentiality, authorization, electronic payments corporate security and so on. 

Cryptographic methods can be used to solve the security issues: confidentiality of transmitted / stored data; authentication; integrity of stored and transmitted data; ensuring document authenticity. Also, these methods are used for information transformation such as encryption (symmetric and asymmetric); hash functions calculation; generation of electronic digital signatures; generation of a sequence of pseudo-random numbers.

#### There’s some common definition for cryptographic.

>   [Encryption is the process of encoding a message or information in such a way that only authorized parties can access it. Encryption does not of itself prevent interference, but denies the intelligible content to a would-be interceptor. In an encryption scheme, the intended information or message, referred to as plaintext, is encrypted using an encryption algorithm, generating ciphertext that can only be read if decrypted.](https://en.wikipedia.org/wiki/Encryption)

#### The Symmetric-key algorithm is usually called classical code number.

Symmetric encryption provides using the same key for both encryption and decryption. Two basic requirements are used for symmetric algorithms: the complete loss of all statistical regularities in the encryption object and the absence of linearity. We should prescind the symmetric systems into block and stream systems. In block systems, the original data is divided into blocks with subsequent conversion with a key. In streaming systems, a certain sequence (output gamma) is generated. It replaces the message itself, and data encryption occurs as the flow while the gamma is being generated.
The block length is usually 8 or 16 bytes. There are algorithms that allow a variable block length. The most famous block ciphers are determined by the American standard DES (Data Encryption Standard), for which the block length n is 64 and 256, respectively.

![Imgur](https://i.imgur.com/rcJUzEA.gif)

I am going to show you how the encryption flow actually works using some Ruby code. We will use 4096-bit key lengths and SHA-256 as our digest function.

>  So, we have the goal:
>  There are two users. They want to send a message to each other that no one else can read. They are defined in our ruby code as sender and recipient.

Let's get create an AsymmetricEncryption class:

```ruby
class AsymmetricEncryption
  attr_reader :config

  def initialize
    @config = { key_length: 4096, digest_func: OpenSSL::Digest::SHA256.new }
  end

  def generate_pair
    { private_key: pair.to_s, public_key: pair.public_key.to_s }
  end

  def decrypt(private_key, encrypted)
    client(private_key).private_decrypt(Base64.decode64(encrypted))
  end

  def encrypt(pub_key, data)
    Base64.encode64(client(pub_key).public_encrypt(data))
  end

  def signature(private_key, data)
    client(private_key).sign(config[:digest_func], data)
  end

  def verify(pub_key, signature, data)
    client(pub_key).verify(config[:digest_func], signature, data)
  end

  private

  def pub
    @pub ||= client(pair.public_key.to_der)
  end

  def pair
    @pair ||= client(config[:key_length])
  end

  def client(key)
    OpenSSL::PKey::RSA.new(key)
  end
end
```

So, let's create specs for it:

```ruby
require 'spec_helper'

describe AsymmetricEncryption do
  let(:data) { 'Hello world' }
  let(:encryptor) { AsymmetricEncryption.new }
  let(:pair) { encryptor.generate_pair }

  it 'encrypt/decrypt'  do
    encrypted = encryptor.encrypt(pair[:public_key], data)
    expect(encryptor.decrypt(pair[:private_key], encrypted)).to eq(data)
  end

  it 'verify/signature' do
    signature = encryptor.signature(pair[:private_key], data)
    expect(encryptor.verify(pair[:public_key], signature, data)).to be_truthy
  end
end
```

First of all, we need to generate key pairs for users. Method generate_pair creates two keys, a public key which will only be used to encrypt data, and a private key, which will only be used to decrypt data.

```ruby
sender_pair = AsymmetricEncryption.new.generate_pair
recipient_pair = AsymmetricEncryption.new.generate_pair

Using the sender's private key, generate a signature for the message:
message = 'Hello world'
encryptor = AsymmetricEncryption.new
signature = encryptor.signature(sender_pair[:private_key], message)
```

Then we will prepare a message to send:

```ruby
encrypted = encryptor.encrypt(recipient_pair[:public_key], message)
```

The recipient will be able to decrypt the message using their private key:

```ruby
decrypted = encryptor.decrypt(recipient_pair[:private_key], encrypted)
```

Additionally recipient can verify that the message is actually from the sender by checking the signature:

```ruby
puts 'Verified' if encryptor.verify(sender_pair[:public_key], signature, decrypted)
```

That’s all.

All open encryption systems have the following disadvantages: the key must be transmitted through a secret channel; hard requirements to the key generation service, due to the fact that for n subscribers with the "each with" interaction scheme, the dependence of the key numbers on the subscriber number is quadratic. The main disadvantage of symmetric encryption is the secret key must be known to both the sender and the recipient.

An issue is the question - how safely to distribute symmetric (secret) keys.

In the future, it’ll be possible: to carry out the transfer of keys based on quantum cryptography; to develop methods and their software and hardware implementation to increase the length of the pseudo-random sequence.
