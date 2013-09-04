# 
# Author: Ben Pottier
#
# Very basic Ruby implementation of Simon (http://eprint.iacr.org/2013/404.pdf)
# Initially only Simon with 128 bit blocks and 256 bit key but intent to fully implement it later :)
#
# This is broken at the moment, 'WIP' as you might call it. 
#

class Simon
  Z = [11111010001001010110000111001101111101000100101011000011100110,
       10001110111110010011000010110101000111011111001001100001011010,
       10101111011100000011010010011000101000010001111110010110110011,
       11011011101011000110010111100000010010001010011100110100001111,
       11010001111001101011011000100000010111000011001010010011101111]
  # From Table 3.1 for 128 bit block size and 256 bit key size
  N,M,T,J = 64, 4, 72, 4

  def self.encrypt_128_256 (pt, key)
    if key.size != 32 
      raise InvalidKeySizeException.new
    end
    k = expand_key(key, 64)
    # Padding and PT words
    pt = pad_PKCS7(pt, 128)
    pt = pt.chars.each_slice(N/8).map {|x| x.join.unpack('b*')[0].to_i(2)}.to_a
    # Rounds
    ct = []
    pt.each_slice(2).with_index { |(x,y),index| # 1 block = 2 N-sized slices
      index *= 2
      (0..T).step(2) { |r|
        x, y = round(x, y, k[r], k[r+1])
      }
      ct[index] = x 
      ct[index+1] = y
    }
    # Would like to know a nicer way to do this :/ :cringe:
    ct.map { |x| x.to_s(2).rjust(128,'0') }.pack('b*')
  end

  def self.decrypt_128_256 (ct, key)
    if key.size != 32
      raise InvalidKeySizeException.new
    end
    k = expand_key(key, 64).reverse
    # Padding and PT words
    ct = ct.chars.each_slice(N/8).map {|x| x.join.unpack('b*')[0].to_i(2)}.to_a
    # Rounds
    pt = []
    ct.each_slice(2).with_index { |(x,y),index| # 1 block = 2 N-sized slices
      index *= 2
      (0..T).step(2) { |r|
        x, y = round_inv(x, y, k[r], k[r+1])
      }
      pt[index] = x 
      pt[index+1] = y
    }
    pt.map { |x| [x.to_s(2).rjust(128,'0')].pack('b*') }.join
  end

  def self.expand_key (key, block_size)
    # Break the key into M implicitly N-bit sized pieces
    # Note that k0..kM-1 are in reverse order (i.e. k0 is last)
    # This could most definitely be done better I think
    k = key.chars.each_slice(block_size/8).map {|x| x.join.unpack('b*')[0].to_i(2)}.to_a.reverse
    for i in M..T-1
      tmp = lcs(k[i-1], block_size, -3)
      if M == 4
        tmp ^= k[i-3]
      end
      k[i] = ~k[i-M] ^ tmp ^ Z[J][(i-M) % 62] ^ 3
    end
    k
  end

  # f(x) ((LCS(x,1) & LCS(x,8)) ^ LCS(x,2))
  def self.f (x, block_size)
    ((lcs(x, block_size, 1) & lcs(x, block_size, 8)) ^ lcs(x, block_size, 2))
  end

  def self.round (x, y, k1, k2)
    y ^= f(x, N)
    y ^= k1
    x ^= f(y, N)
    x ^= k2
    return x, y
  end

  def self.round_inv (x, y, k1, k2)
    x ^= k2
    x ^= f(y, N)
    y ^= k1
    y ^= f(x, N)
    return x, y
  end

  # Left circular shift
  def self.lcs (bytes, block_size, shift)
    ((bytes << shift) | (bytes >> (block_size - shift))) & ((1<<block_size)-1)    
  end

  def self.pad_PKCS7 (bytes, block_size)
    block_size /= 8 # bits to bytes
    padding_count = (block_size - (bytes.size % block_size))
    padding_count.times do
      bytes += [padding_count].pack('C*')
    end
    bytes
  end
  
  class InvalidKeySizeException < Exception
  end

  private_class_method :new, :expand_key, :round, :round_inv, :f, :lcs, :pad_PKCS7
end



