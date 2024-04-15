data "aws_cloudfront_origin_request_policy" "cors_s3_origin" {
  name = "Managed-CORS-S3Origin"
}

data "aws_cloudfront_cache_policy" "caching_optimized" {
  name = "Managed-CachingOptimized"
}

resource "aws_cloudfront_distribution" "frontend" {
  enabled = true

  origin {
    origin_id                = aws_s3_bucket.frontend.id
    domain_name              = aws_s3_bucket.frontend.bucket_regional_domain_name
    origin_access_control_id = aws_cloudfront_origin_access_control.frontend.id
  }

  aliases = [local.domain]

  viewer_certificate {
    acm_certificate_arn = aws_acm_certificate.frontend.arn
    ssl_support_method  = "sni-only"
  }

  default_root_object = "index.html"

  custom_error_response {
    error_code         = 403
    response_page_path = "/"
    response_code      = 200
  }

  default_cache_behavior {
    target_origin_id         = aws_s3_bucket.frontend.id
    viewer_protocol_policy   = "redirect-to-https"
    cached_methods           = ["GET", "HEAD"]
    allowed_methods          = ["GET", "HEAD"]
    origin_request_policy_id = data.aws_cloudfront_origin_request_policy.cors_s3_origin.id
    cache_policy_id          = data.aws_cloudfront_cache_policy.caching_optimized.id
    compress                 = true
  }

  restrictions {
    geo_restriction {
      restriction_type = "none"
    }
  }
}

resource "aws_cloudfront_origin_access_control" "frontend" {
  name                              = "${local.prefix}-frontend"
  origin_access_control_origin_type = "s3"
  signing_behavior                  = "always"
  signing_protocol                  = "sigv4"
}
