using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class shoting : MonoBehaviour
{

    public Transform Point;
    public GameObject bulletPrefab;
    public GameObject bullet2Prefab;
    private float period = 0.0f;
    public float shootSpeed;

    public float bulletForce = 20f;

    // Update is called once per frame
    void Update()
    {
        if (period > shootSpeed * 0.1)
     {
         if(Input.GetButton("Fire1"))
        {
            Shoot();
        }
         period = 0;
     }
     period += UnityEngine.Time.deltaTime;
        
        
        if(Input.GetButton("Fire2"))
        {
            Shoot2();
        }
    }

    void Shoot2()
    {
        GameObject bullet2 = Instantiate(bullet2Prefab, Point.position, Point.rotation);
        Rigidbody2D rb = bullet2.GetComponent<Rigidbody2D>();
        rb.AddForce(Point.up * bulletForce, ForceMode2D.Impulse);
    }


    void Shoot()
    {
        GameObject bullet = Instantiate(bulletPrefab, Point.position, Point.rotation);
        Rigidbody2D rb = bullet.GetComponent<Rigidbody2D>();
        rb.AddForce(Point.up * bulletForce, ForceMode2D.Impulse);
    }
    
}
